import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const { headers } = req;
  const upgradeHeader = headers.get("upgrade") || "";

  if (upgradeHeader.toLowerCase() !== "websocket") {
    return new Response("Expected WebSocket connection", { status: 400 });
  }

  const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
  if (!OPENAI_API_KEY) {
    return new Response("OPENAI_API_KEY not configured", { status: 500 });
  }

  // Upgrade client connection to WebSocket
  const { socket: clientSocket, response } = Deno.upgradeWebSocket(req);

  // Connect to OpenAI Realtime API
  const openAIUrl = `wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17`;
  const openAISocket = new WebSocket(openAIUrl, {
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "OpenAI-Beta": "realtime=v1",
    },
  });

  let sessionConfigured = false;

  openAISocket.onopen = () => {
    console.log("Connected to OpenAI Realtime API");
  };

  openAISocket.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      console.log("OpenAI event:", data.type);

      // Configure session after connection
      if (data.type === "session.created" && !sessionConfigured) {
        sessionConfigured = true;
        console.log("Session created, configuring...");
        
        const sessionConfig = {
          type: "session.update",
          session: {
            modalities: ["text", "audio"],
            instructions: "You are a helpful transcription assistant. Transcribe the user's speech accurately.",
            voice: "alloy",
            input_audio_format: "pcm16",
            output_audio_format: "pcm16",
            input_audio_transcription: {
              model: "whisper-1"
            },
            turn_detection: {
              type: "server_vad",
              threshold: 0.5,
              prefix_padding_ms: 300,
              silence_duration_ms: 1000
            },
            temperature: 0.8,
          }
        };
        
        openAISocket.send(JSON.stringify(sessionConfig));
        console.log("Session configured");
      }

      // Forward all events to client
      clientSocket.send(JSON.stringify(data));
    } catch (error) {
      console.error("Error processing OpenAI message:", error);
    }
  };

  openAISocket.onerror = (error) => {
    console.error("OpenAI WebSocket error:", error);
    clientSocket.send(JSON.stringify({ type: "error", error: "OpenAI connection error" }));
  };

  openAISocket.onclose = () => {
    console.log("OpenAI WebSocket closed");
    clientSocket.close();
  };

  // Handle messages from client
  clientSocket.onmessage = (event) => {
    try {
      if (openAISocket.readyState === WebSocket.OPEN) {
        // Forward client audio/messages to OpenAI
        openAISocket.send(event.data);
      }
    } catch (error) {
      console.error("Error forwarding to OpenAI:", error);
    }
  };

  clientSocket.onerror = (error) => {
    console.error("Client WebSocket error:", error);
  };

  clientSocket.onclose = () => {
    console.log("Client disconnected");
    openAISocket.close();
  };

  return response;
});
