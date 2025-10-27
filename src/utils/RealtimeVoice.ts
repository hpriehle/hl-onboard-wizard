export class AudioRecorder {
  private stream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private processor: ScriptProcessorNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;
  private gainNode: GainNode | null = null;

  constructor(private onAudioData: (audioData: Float32Array) => void) {}

  async start() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 24000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      });
      
      this.audioContext = new AudioContext({
        sampleRate: 24000,
      });
      
      this.source = this.audioContext.createMediaStreamSource(this.stream);
      // Use 2048 buffer for better stability (~85ms at 24kHz)
      this.processor = this.audioContext.createScriptProcessor(2048, 1, 1);
      
      // Create a muted gain node to prevent audio loopback/feedback
      this.gainNode = this.audioContext.createGain();
      this.gainNode.gain.value = 0;
      
      this.processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        this.onAudioData(new Float32Array(inputData));
      };
      
      // Route: source -> processor -> muted gain -> destination
      // This keeps the graph active without playing mic audio to speakers
      this.source.connect(this.processor);
      this.processor.connect(this.gainNode);
      this.gainNode.connect(this.audioContext.destination);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      throw error;
    }
  }

  getSampleRate(): number | null {
    return this.audioContext?.sampleRate ?? null;
  }

  stop() {
    if (this.source) {
      this.source.disconnect();
      this.source = null;
    }
    if (this.processor) {
      this.processor.disconnect();
      this.processor = null;
    }
    if (this.gainNode) {
      this.gainNode.disconnect();
      this.gainNode = null;
    }
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}

// Resample audio to 24kHz and encode as base64 PCM16
export const encodeResampledAudioForAPI = (float32Array: Float32Array, inputSampleRate: number): string => {
  const TARGET_SAMPLE_RATE = 24000;
  
  let resampledData: Float32Array;
  
  if (inputSampleRate === TARGET_SAMPLE_RATE) {
    // No resampling needed
    resampledData = float32Array;
  } else {
    // Resample using linear interpolation
    const ratio = inputSampleRate / TARGET_SAMPLE_RATE;
    const outputLength = Math.floor(float32Array.length / ratio);
    resampledData = new Float32Array(outputLength);
    
    for (let i = 0; i < outputLength; i++) {
      const srcIndex = i * ratio;
      const srcIndexFloor = Math.floor(srcIndex);
      const srcIndexCeil = Math.min(srcIndexFloor + 1, float32Array.length - 1);
      const fraction = srcIndex - srcIndexFloor;
      
      // Linear interpolation
      resampledData[i] = 
        float32Array[srcIndexFloor] * (1 - fraction) + 
        float32Array[srcIndexCeil] * fraction;
    }
  }
  
  // Convert to Int16 PCM
  const int16Array = new Int16Array(resampledData.length);
  for (let i = 0; i < resampledData.length; i++) {
    const s = Math.max(-1, Math.min(1, resampledData[i]));
    int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
  }
  
  // Convert to base64
  const uint8Array = new Uint8Array(int16Array.buffer);
  let binary = '';
  const chunkSize = 0x8000;
  
  for (let i = 0; i < uint8Array.length; i += chunkSize) {
    const chunk = uint8Array.subarray(i, Math.min(i + chunkSize, uint8Array.length));
    binary += String.fromCharCode.apply(null, Array.from(chunk));
  }
  
  return btoa(binary);
};

export class RealtimeVoiceService {
  private ws: WebSocket | null = null;
  private recorder: AudioRecorder | null = null;
  private isConnected = false;
  private commitIntervalId: number | null = null;
  private hasNewAudio = false;
  // Track appended audio since last commit to satisfy 100ms minimum
  private appendedSamplesSinceLastCommit = 0;
  private readonly MIN_COMMIT_SAMPLES = 2400; // 100ms at 24kHz
  
  // Audio resampling
  private inputSampleRate = 48000; // Default assumption
  private firstAudioChunk = true;
  
  // VAD state
  private isSpeaking = false;
  private readonly START_THRESHOLD = 0.02; // RMS threshold to start
  private readonly STOP_THRESHOLD = 0.01; // RMS threshold to stop
  private silenceFrames = 0;
  private readonly SILENCE_FRAMES_THRESHOLD = 4; // ~340ms at 2048 buffer
  
  // UI deduping
  private lastEmittedFragment = '';
  private lastEmitTime = 0;
  private readonly DEDUPE_WINDOW_MS = 300;
  
  constructor(
    private onTranscript: (transcript: string, isFinal: boolean) => void,
    private onError: (error: string) => void
  ) {}

  async connect() {
    return new Promise<void>((resolve, reject) => {
      // Use the project-specific URL
      const wsUrl = `wss://skqjlrryaravvqdphkov.supabase.co/functions/v1/realtime-voice`;
      
      console.log('Connecting to WebSocket:', wsUrl);
      this.ws = new WebSocket(wsUrl);

      this.ws.onopen = () => {
        console.log('WebSocket connected');
        this.isConnected = true;
        resolve();
      };

      this.ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log('Received event:', data.type, data);

          // ONLY handle INPUT audio transcription - what the USER said
          if (data.type === 'conversation.item.input_audio_transcription.completed') {
            const transcript = data.transcript || '';
            if (transcript) {
              console.log('User said:', transcript);
              this.onTranscript(transcript, true);
            }
          }

          // Handle partial transcription with deduping
          if (data.type === 'conversation.item.input_audio_transcription.delta') {
            const delta = data.delta || '';
            if (delta) {
              console.log('User transcript delta:', delta);
              // Dedupe: if same short token repeats within window, skip
              const now = Date.now();
              if (delta === this.lastEmittedFragment && 
                  delta.length <= 10 && 
                  now - this.lastEmitTime < this.DEDUPE_WINDOW_MS) {
                console.log('Skipping duplicate token:', delta);
                return;
              }
              this.lastEmittedFragment = delta;
              this.lastEmitTime = now;
              this.onTranscript(delta, false);
            }
          }

          // Handle speech detection
          if (data.type === 'input_audio_buffer.speech_started') {
            console.log('User started speaking');
          }

          if (data.type === 'input_audio_buffer.speech_stopped') {
            console.log('User stopped speaking');
          }

          if (data.type === 'error') {
            console.error('OpenAI error:', data.error);
            const errorMsg = data.error?.message || 'Unknown error';
            // Handle "buffer too small" gracefully - just wait for more audio
            if (errorMsg.includes('buffer too small')) {
              console.log('Buffer too small, will retry with more audio');
              // Don't reset counters, let more audio accumulate
              return;
            }
            this.onError(errorMsg);
          }
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.isConnected = false;
        this.onError('Connection error');
        reject(error);
      };

      this.ws.onclose = () => {
        console.log('WebSocket closed');
        this.isConnected = false;
      };
    });
  }

  async startRecording() {
    if (!this.isConnected || !this.ws) {
      throw new Error('Not connected to server');
    }

    this.recorder = new AudioRecorder((audioData) => {
      if (this.ws && this.ws.readyState === WebSocket.OPEN) {
        // Capture input sample rate on first chunk
        if (this.firstAudioChunk) {
          this.inputSampleRate = this.recorder?.getSampleRate() || 48000;
          console.log('Detected input sample rate:', this.inputSampleRate, 'Hz');
          console.log('Will resample to 24000 Hz for OpenAI');
          this.firstAudioChunk = false;
        }
        
        // Compute RMS for logging
        let sumSquares = 0;
        for (let i = 0; i < audioData.length; i++) {
          sumSquares += audioData[i] * audioData[i];
        }
        const rms = Math.sqrt(sumSquares / audioData.length);
        
        // VAD state machine for logging only
        if (rms > this.START_THRESHOLD) {
          if (!this.isSpeaking) {
            console.log('Speech detected (RMS:', rms.toFixed(4), ')');
            this.isSpeaking = true;
          }
          this.silenceFrames = 0;
        } else if (rms < this.STOP_THRESHOLD) {
          this.silenceFrames++;
          if (this.isSpeaking && this.silenceFrames >= this.SILENCE_FRAMES_THRESHOLD) {
            console.log('Silence detected (frames:', this.silenceFrames, ')');
            this.isSpeaking = false;
            this.silenceFrames = 0;
          }
        }
        
        // Resample and send ALL audio continuously
        const base64Audio = encodeResampledAudioForAPI(audioData, this.inputSampleRate);
        this.ws.send(JSON.stringify({
          type: 'input_audio_buffer.append',
          audio: base64Audio
        }));
        this.hasNewAudio = true;
        // Count resampled samples (at 24kHz)
        const resampledLength = Math.floor(audioData.length * (24000 / this.inputSampleRate));
        this.appendedSamplesSinceLastCommit += resampledLength;
      }
    });

    await this.recorder.start();
    // Reset counters and VAD state
    this.appendedSamplesSinceLastCommit = 0;
    this.isSpeaking = false;
    this.silenceFrames = 0;
    this.lastEmittedFragment = '';
    this.lastEmitTime = 0;
    this.firstAudioChunk = true;
    
    // Server-side VAD handles committing; send continuous audio only
    console.log('Recording started');
  }

  stopRecording() {
    // Clear periodic commits
    if (this.commitIntervalId) {
      clearInterval(this.commitIntervalId);
      this.commitIntervalId = null;
    }
    if (this.recorder) {
      this.recorder.stop();
      this.recorder = null;
      console.log('Recording stopped');
      
      // No final commit when using server-side VAD
      // Reset VAD state
      this.isSpeaking = false;
      this.silenceFrames = 0;
    }
  }

  disconnect() {
    this.stopRecording();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.isConnected = false;
  }
}
