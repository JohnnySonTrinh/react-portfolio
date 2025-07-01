import ReactMarkdown from "react-markdown";
import useChatbotUI from "../../hooks/useChatbot";
import { followUpSuggestions } from "../../data/chatData";
import "../../styles/chatAssistant.css";

const ChatAssistant = () => {
  const {
    messages,
    loading,
    input,
    setInput,
    handleSendMessage,
    clearChat,
    chatEndRef,
    sendMessage,
  } = useChatbotUI();

  return (
    <div className="chat-menu fade-in" role="region" aria-label="Johnny's Chat Assistant">
      <div className="chat-messages" role="log" aria-live="polite">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`chat-bubble ${msg.sender}`}
            role="article"
            aria-label={`Message from ${msg.sender === "ai" ? "Johnny's assistant" : "You"}`}
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
          <div className="suggestion-buttons" role="group" aria-label="Suggested questions">
            {followUpSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => sendMessage(suggestion)}
                aria-label={`Send suggested message: ${suggestion}`}
              >
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
          aria-label="Type a message to Johnny's assistant"
        />
        <button
          className="send-button"
          onClick={handleSendMessage}
          disabled={loading}
          aria-label={loading ? "Sending message, please wait" : "Send message"}
        >
          {loading ? "..." : "SEND"}
        </button>
        <button
          onClick={clearChat}
          className="clear-button"
          aria-label="Clear all chat messages"
        >
          RESET
        </button>
      </div>
    </div>
  );
};

export default ChatAssistant;
