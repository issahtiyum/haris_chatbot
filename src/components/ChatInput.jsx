import { useRef } from "react";
import { Chatbot } from "supersimpledev";
import dayjs from "dayjs";
import LoadingSpinner from "../assets/loading-spinner.gif";
import "./ChatInput.css";

export default function ChatInput({ messages, setMessages }) {
  const inputRef = useRef();

  async function sendMessage(message) {
    const newMessages = [
      ...messages,
      {
        sender: "user",
        message,
        id: crypto.randomUUID(),
        timeSent: dayjs().valueOf(),
      },
    ];
    setMessages(newMessages);
    inputRef.current.value = "";

    setMessages([
      ...newMessages,
      {
        sender: "bot",
        message: <img src={LoadingSpinner} className="loading-spinner" />,
        id: crypto.randomUUID(),
      },
    ]);

    const response = await Chatbot.getResponseAsync(message);

    setMessages([
      ...newMessages,
      {
        sender: "bot",
        message: response,
        id: crypto.randomUUID(),
        timeSent: dayjs().valueOf(),
      },
    ]);
  }

  return (
    <div className="chat-input">
      <input
        placeholder="Send a message to chatbot"
        ref={inputRef}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const message = inputRef.current.value;
            sendMessage(message);
          }
        }}
      />
      <button
        className="send"
        onClick={() => {
          const message = inputRef.current.value;
          sendMessage(message);
        }}
      >
        Send
      </button>

      <button
        className="clear"
        onClick={() => {
          setMessages([]);
        }}
      >
        Clear
      </button>
    </div>
  );
}
