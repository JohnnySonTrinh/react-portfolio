import { followUpSuggestions } from "../../data/chatData";
import { useState, useRef, useEffect } from "react";
import useChatbot from "../../hooks/useChatbot";
import ReactMarkdown from "react-markdown";

const ChatbotMenu = () => {
  const { messages, sendMessage, loading, clearChat } = useChatbot();
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
    setInput("");
  };

  return (
    <div className="chat-menu fade-in" role="region" aria-label="AI Chatbot">
      <div className="chat-header" role="heading" aria-level="2">
        🟢 Personal Assistant
      </div>

      <div className="chat-messages" role="log" aria-live="polite">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-bubble ${msg.sender}`}
            role="article"
            aria-label={`Message from ${
              msg.sender === "ai" ? "Johnny" : "User"
            }`}
          >
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        ))}
        {loading && (
          <div className="chat-bubble ai" role="status" aria-live="assertive">
            Typing...
          </div>
        )}
        <div ref={chatEndRef} />
        {followUpSuggestions && messages.length <= 2 && (
          <div className="suggestion-buttons">
            {followUpSuggestions.map((suggestion, index) => (
              <button key={index} onClick={() => sendMessage(suggestion)}>
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="chat-input-container">
        <label htmlFor="chat-input" className="visually-hidden">
          Type your message here
        </label>
        <input
          id="chat-input"
          type="text"
          placeholder="Type a message..."
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          aria-label="Chat input field"
        />

        <button
          className="send-button"
          onClick={handleSendMessage}
          disabled={loading}
          aria-label={loading ? "Sending message, please wait" : "Send message"}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
      <button
        onClick={clearChat}
        className="clear-button"
        aria-label="Clear chat"
      >
        RESET
      </button>
    </div>
  );
};

export default ChatbotMenu;
