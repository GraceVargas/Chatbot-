const ChatMessage = ({
  text,
  from
}: {
  text: string;
  from: string;
}) => {
  const fromChatbot = from === "chatbot";
  return (
    <div className={`flex items-end ${! fromChatbot ? "flex-row-reverse" : ""}`}>
      <div className="rounded bg-primary-500 w-8 aspect-square p-1.5 shrink-0">
        {fromChatbot ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <path
              fill="#ffffff"
              d="M230.92 212c-15.23-26.33-38.7-45.21-66.09-54.16a72 72 0 1 0-73.66 0c-27.39 8.94-50.86 27.82-66.09 54.16a8 8 0 1 0 13.85 8c18.84-32.56 52.14-52 89.07-52s70.23 19.44 89.07 52a8 8 0 1 0 13.85-8M72 96a56 56 0 1 1 56 56a56.06 56.06 0 0 1-56-56"
            />
          </svg>
        )}
      </div>
      <p className="mx-2 p-2 rounded border border-gray-400 leading-4 text-sm">
        {text}
      </p>
    </div>
  );
};

export default ChatMessage;
