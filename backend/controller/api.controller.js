import https from 'https';

let conversation = []; //historial para chatbot

export const askChat = (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).send("Falta el mensaje");

  const OPENROUTER_API_KEY = process.env.KEY_OPENROUTER;

  
//   Agregar nuevo mensaje del usuario a la conversación
  conversation.push({ role: "user", content: message });

  // Limitar la memoria a los últimos 10 mensajes
  if (conversation.length > 10) conversation = conversation.slice(-10);

  // Configurar headers de streaming
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Transfer-Encoding", "chunked");

  const body = JSON.stringify({
    model: "google/gemma-3-27b-it", //openai/gpt-oss-120b x-ai/grok-4-fast meta-llama/llama-4-maverick:free  openrouter/polaris-alpha mistralai/mistral-small-3.2-24b-instruct minimax/minimax-m2 baidu/ernie-4.5-21b-a3b-thinking  tngtech/deepseek-r1t2-chimera:free  google/gemini-2.5-flash-lite nvidia/nemotron-nano-12b-v2-vl:free alibaba/tongyi-deepresearch-30b-a3b:free openai/gpt-oss-20b:free deepseek/deepseek-v3.2-exp openai/gpt-5-nano
    messages: conversation,
    stream: true,
  });

  const options = {
    hostname: "openrouter.ai",
    path: "/api/v1/chat/completions",
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(body),
    },
  };

  try {
    const request = https.request(options, (response) => {
      let buffer = "";
      let assistantReply = "";

      response.on("data", (chunk) => {
        buffer += chunk.toString("utf-8");

        let lineEnd;
        while ((lineEnd = buffer.indexOf("\n")) !== -1) {
          const line = buffer.slice(0, lineEnd).trim();
          buffer = buffer.slice(lineEnd + 1);

          if (!line.startsWith("data:")) continue;
          const data = line.slice(5).trim();
          if (data === "[DONE]") {
            // Guardar la respuesta del asistente en la memoria
            conversation.push({ role: "assistant", content: assistantReply });
            res.write(`data: [DONE]\n\n`);
            res.end();
            return;
          }

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantReply += content;
              res.write(`data: ${JSON.stringify({ content })}\n\n`);
            }
          } catch (err) {
            // ignorar líneas no parseables
          }
        }
      });

      response.on("end", () => res.end());
    });

    request.on("error", (err) => {
      console.error("❌ HTTPS request error:", err);
      res.status(500).end("Error: " + err.message);
    });

    
    request.write(body);
    request.end();
  } catch (err) {
    console.error("❌ Streaming error:", err);
    res.status(500).end("Error: " + err.message);
  }
};
