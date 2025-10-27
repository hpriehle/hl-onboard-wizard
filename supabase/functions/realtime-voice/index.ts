import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

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

  console.log("Creating ephemeral token...");
  
  // First, create an ephemeral token
  let ephemeralKey: string;
  try {
    const sessionResponse = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-realtime-preview-2024-12-17",
        voice: "alloy",
        instructions: "You are a helpful transcription assistant. Transcribe the user's speech accurately in real-time."
      }),
    });

    if (!sessionResponse.ok) {
      const errorText = await sessionResponse.text();
      console.error("Failed to create session:", sessionResponse.status, errorText);
      return new Response(`Failed to create OpenAI session: ${errorText}`, { status: 500 });
    }

    const sessionData = await sessionResponse.json();
    ephemeralKey = sessionData.client_secret.value;
    console.log("Ephemeral token created successfully");
  } catch (error) {
    console.error("Error creating ephemeral token:", error);
    return new Response("Failed to create ephemeral token", { status: 500 });
  }

  // Upgrade client connection to WebSocket
  const { socket: clientSocket, response } = Deno.upgradeWebSocket(req);

  // Connect to OpenAI Realtime API using ephemeral token
  const openAIUrl = `wss://api.openai.com/v1/realtime?model=gpt-4o-realtime-preview-2024-12-17`;
  let openAISocket: WebSocket;
  
  try {
    openAISocket = new WebSocket(
      openAIUrl,
      ["realtime", `openai-insecure-api-key.${ephemeralKey}`, "openai-beta.realtime-v1"]
    );
  } catch (error) {
    console.error("Error creating WebSocket:", error);
    return new Response("Failed to create WebSocket connection", { status: 500 });
  }

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
            modalities: ["text"],  // Only text, no audio output
            instructions: "You are a transcription service. Only transcribe what the user says. Do not respond or engage in conversation.",
            input_audio_format: "pcm16",
            input_audio_transcription: {
              model: "whisper-1"
            },
            turn_detection: {
              type: "server_vad",
              threshold: 0.5,
              prefix_padding_ms: 300,
              silence_duration_ms: 1000
            },
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
