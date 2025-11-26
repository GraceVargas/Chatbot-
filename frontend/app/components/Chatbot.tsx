"use client";

import { FormEvent, useRef } from "react";
import ChatMessage from "./ChatMessage";
import useSendMessage from "../hooks/useSendMessage";


function Chatbot() {

  const { messages, sendMessage, setMessages } = useSendMessage();
  const textArea = useRef<HTMLTextAreaElement>(null);

  const sendUserMsg = () => {
    const message = textArea.current?.value.trim();
    if (!message) return; 

    setMessages((prev) => [
      ...prev,
      { id: prev.length, from: "user", text: message },
      { id: prev.length + 1, from: "chatbot", text: "" },
    ]);
    sendMessage(message);
    
    if (textArea.current) {
      textArea.current.value = "";
    }
  }
  
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendUserMsg();
    
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendUserMsg();
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full">
        <div className="m-2 w-full md:w-3/4 border flex flex-col rounded-xl">
          <header className="w-full bg-primary-500 flex justify-center px-2 py-3 items-center">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 w-8"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="#ffffff"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  color="#ffffff"
                >
                  <path d="M4 15.5a2 2 0 1 1 0-4m16 4a2 2 0 1 0 0-4M7 7V4m10 3V4" />
                  <circle cx="7" cy="3" r="1" />
                  <circle cx="17" cy="3" r="1" />
                  <path d="M13.5 7h-3c-2.828 0-4.243 0-5.121.909S4.5 10.281 4.5 13.207s0 4.389.879 5.298c.878.909 2.293.909 5.121.909h1.025c.792 0 1.071.163 1.617.757c.603.657 1.537 1.534 2.382 1.738c1.201.29 1.336-.111 1.068-1.256c-.076-.326-.267-.847-.066-1.151c.113-.17.3-.212.675-.296c.591-.132 1.079-.348 1.42-.701c.879-.91.879-2.372.879-5.298s0-4.389-.879-5.298C17.743 7 16.328 7 13.5 7" />
                  <path d="M9.5 15c.57.607 1.478 1 2.5 1s1.93-.393 2.5-1m-5.491-4H9m6.009 0H15" />
                </g>
              </svg>
              TravelBot
            </h2>
          </header>

          <div className=" h-[70vh] flex flex-col gap-4 p-2 select-none overflow-y-auto">
            {messages.map((msg) => (
              <ChatMessage key={msg.id} from={msg.from} text={msg.text} />
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex items-center my-2 mx-1">
            <textarea
              ref={textArea}
              id="question"
              name="question"
              className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Escribe tu pregunta..."
              onKeyDown={handleKeyDown}
            ></textarea>
            <button
              type="submit"
              className="flex justify-center items-center aspect-square h-9 bg-primary-500 inlineFlex justifyCenter p-2 text-white rounded-full cursor-pointer hover:bg-primary-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M4.4 19.425q-.5.2-.95-.088T3 18.5V14l8-2l-8-2V5.5q0-.55.45-.837t.95-.088l15.4 6.5q.625.275.625.925t-.625.925z"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Chatbot;
