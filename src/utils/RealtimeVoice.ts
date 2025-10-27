export class AudioRecorder {
  private stream: MediaStream | null = null;
  private audioContext: AudioContext | null = null;
  private processor: ScriptProcessorNode | null = null;
  private source: MediaStreamAudioSourceNode | null = null;

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
      this.processor = this.audioContext.createScriptProcessor(1024, 1, 1);
      
      this.processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0);
        this.onAudioData(new Float32Array(inputData));
      };
      
      this.source.connect(this.processor);
      this.processor.connect(this.audioContext.destination);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      throw error;
    }
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

export const encodeAudioForAPI = (float32Array: Float32Array): string => {
  const int16Array = new Int16Array(float32Array.length);
  for (let i = 0; i < float32Array.length; i++) {
    const s = Math.max(-1, Math.min(1, float32Array[i]));
    int16Array[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
  }
  
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

          // Handle partial transcription
          if (data.type === 'conversation.item.input_audio_transcription.delta') {
            const delta = data.delta || '';
            if (delta) {
              console.log('User transcript delta:', delta);
              this.onTranscript(delta, false);
            }
          }

          // Handle speech detection
          if (data.type === 'input_audio_buffer.speech_started') {
            console.log('User started speaking');
          }

          if (data.type === 'input_audio_buffer.speech_stopped') {
            console.log('User stopped speaking');
            // Force an immediate commit if we have buffered audio
            if (this.ws && this.ws.readyState === WebSocket.OPEN && this.appendedSamplesSinceLastCommit > 0) {
              try {
                this.ws.send(JSON.stringify({ type: 'input_audio_buffer.commit' }));
                this.appendedSamplesSinceLastCommit = 0;
                this.hasNewAudio = false;
              } catch (e) {
                console.error('Failed to commit on speech_stopped', e);
              }
            }
          }

          if (data.type === 'error') {
            console.error('OpenAI error:', data.error);
            this.onError(data.error?.message || 'Unknown error');
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
        const base64Audio = encodeAudioForAPI(audioData);
        this.ws.send(JSON.stringify({
          type: 'input_audio_buffer.append',
          audio: base64Audio
        }));
        // Mark that we have new audio since the last commit
        this.hasNewAudio = true;
        // Track how much audio has been appended since last commit (samples)
        this.appendedSamplesSinceLastCommit += audioData.length;
      }
    });

    await this.recorder.start();
    // Reset counters
    this.appendedSamplesSinceLastCommit = 0;
    // Start periodic commits to get incremental transcripts
    // Commit frequently but only when >=100ms of audio is buffered
    if (this.commitIntervalId) {
      clearInterval(this.commitIntervalId);
    }
    this.commitIntervalId = window.setInterval(() => {
      if (
        this.ws &&
        this.ws.readyState === WebSocket.OPEN &&
        this.hasNewAudio &&
        this.appendedSamplesSinceLastCommit >= this.MIN_COMMIT_SAMPLES
      ) {
        this.ws.send(JSON.stringify({ type: 'input_audio_buffer.commit' }));
        this.hasNewAudio = false;
        this.appendedSamplesSinceLastCommit = 0;
      }
    }, 250);
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
      
      // Final commit to flush any remaining audio
      if (this.ws && this.ws.readyState === WebSocket.OPEN && this.appendedSamplesSinceLastCommit > 0) {
        this.ws.send(JSON.stringify({
          type: 'input_audio_buffer.commit'
        }));
        this.appendedSamplesSinceLastCommit = 0;
        console.log('Audio buffer committed for transcription');
      }
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
