import { useRef, useEffect } from "react";
import dayjs from "dayjs";
import BotProfileImage from "../assets/bot.png";
import UserProfileImage from "../assets/user.png";
import "./ChatMessages.css";

export default function ChatMessages({ messages }) {
  const chatAreaRef = useRef();

  useEffect(() => {
    if (chatAreaRef) {
      const area = chatAreaRef.current;
      area.scrollTop = area.scrollHeight;
    }
  }, [messages]);

  const displayedMessages = messages.map(
    ({ id, sender, message, timeSent }) => (
      <div key={id} className={`message ${sender}`}>
        {sender == "bot" && <img src={BotProfileImage} />}
        <div className="bubble">
          {message}
          {timeSent && (
            <div className="time-sent">{dayjs(timeSent).format("h:mma")}</div>
          )}
        </div>
        {sender == "user" && <img src={UserProfileImage} />}
      </div>
    )
  );

  return (
    <div ref={chatAreaRef} className="chat-area">
      {displayedMessages}
    </div>
  );
}
