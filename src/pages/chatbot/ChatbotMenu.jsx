import { useState, useRef, useEffect } from "react";
import useChatbot from "../../hooks/useChatbot"; // Import chatbot logic

const ChatbotMenu = () => {
  const { messages, sendMessage, loading } = useChatbot();
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle sending message
  const handleSendMessage = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput(""); // Clear input field
  };

  return (
    <div className="chat-menu fade-in">
      <div className="chat-header">💬 AI Johnny</div>
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="chat-bubble ai">Typing...</div>} {/* Show typing status */}
        <div ref={chatEndRef} />
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          placeholder="Type a message..."
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button className="send-button" onClick={handleSendMessage} disabled={loading}>
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatbotMenu;
