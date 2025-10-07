import { useState, useEffect } from "react";
import { Chatbot } from "supersimpledev";
import dayjs from "dayjs";
import ChatInput from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import "./App.css";

export default function App() {
  const initialMessages = JSON.parse(localStorage.getItem("messages")) || [
    {
      message:
        "Hello! I am Haris's Chat Bot! Currently, I only know how to flip a coin, roll a dice, or get today's date. Let me know how I can help!",
      sender: "bot",
      id: "id2",
      timeSent: dayjs().valueOf(),
    },
  ];

  const [messages, setMessages] = useState(initialMessages);

  useEffect(() => {
    Chatbot.addResponses({
      "Who were you created by?": "I am a product of Haris Issah.",
      "When you made?":
        "I was made on the 5th of October, and it has been greatness since",
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  return (
    <div className="chatbot">
      <ChatInput setMessages={setMessages} messages={messages} />
      <ChatMessages messages={messages} />
    </div>
  );
}
