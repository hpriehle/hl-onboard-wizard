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
      this.processor = this.audioContext.createScriptProcessor(4096, 1, 1);
      
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

          // Handle input audio transcription - COMPLETED
          if (data.type === 'conversation.item.input_audio_transcription.completed') {
            const transcript = data.transcript || '';
            if (transcript) {
              console.log('Final transcript:', transcript);
              this.onTranscript(transcript, true);
            }
          }

          // Handle input audio transcription - DELTA (partial)
          if (data.type === 'conversation.item.input_audio_transcription.delta') {
            const delta = data.delta || '';
            if (delta) {
              console.log('Transcript delta:', delta);
              this.onTranscript(delta, false);
            }
          }

          // Handle response audio transcript (AI speaking back)
          if (data.type === 'response.audio_transcript.delta') {
            const delta = data.delta || '';
            if (delta) {
              console.log('Response transcript delta:', delta);
              this.onTranscript(delta, false);
            }
          }

          if (data.type === 'response.audio_transcript.done') {
            const transcript = data.transcript || '';
            if (transcript) {
              console.log('Response transcript done:', transcript);
              this.onTranscript(transcript, true);
            }
          }

          // Handle speech detection
          if (data.type === 'input_audio_buffer.speech_started') {
            console.log('Speech started');
          }

          if (data.type === 'input_audio_buffer.speech_stopped') {
            console.log('Speech stopped');
          }

          // Handle conversation item creation
          if (data.type === 'conversation.item.created') {
            console.log('Conversation item created:', data.item);
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
        const message = {
          type: 'input_audio_buffer.append',
          audio: base64Audio
        };
        this.ws.send(JSON.stringify(message));
      }
    });

    await this.recorder.start();
    console.log('Recording started');
  }

  stopRecording() {
    if (this.recorder) {
      this.recorder.stop();
      this.recorder = null;
      console.log('Recording stopped');
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
