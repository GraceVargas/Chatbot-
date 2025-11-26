import { useState } from "react";
import { logout } from "../lib/auth";

type Msg = { id: number; from: "user" | "chatbot"; text: string };

function useSendMessage() {
  const [messages, setMessages] = useState<Msg[]>([
      { id: 0, from: "chatbot", text: "Hola, en qué te puedo ayudar?" },
    ]);
  
    const sendMessage = async (message: string) => {
      const response = await fetch("api/chat", {
        method: "POST",
        body: JSON.stringify({ message }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 500) {
        logout();
      }
  
      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
  
      const done = false;
  
      while (!done) {
        const { value, done } = await reader.read();
        if (done) break;
  
        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");
  
        for (const line of lines) {
          if (!line.startsWith("data:")) continue;
  
          const data = line.slice(5).trim();
          if (data === "[DONE]") return;
  
          const json = JSON.parse(data);
  
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          console.log(last)
          if (last.from !== "chatbot") return prev;
  
          const updated = {...last, text: last.text + json.content,}
          return [...prev.slice(0, -1), updated];
        });
      }
      }
    };

    return { messages, sendMessage, setMessages }
}

export default useSendMessage