import { useState } from "react";
import EmailGate from "./EmailGate";
import useEmailGate from "../../hooks/useEmailGate";
import useChatbotUI from "../../hooks/useChatbotUI";
import { followUpSuggestions } from "../../data/chatData";
import ReactMarkdown from "react-markdown";
import VoiceAssistant from "../../components/voiceAssistant/VoiceAssistant";

const ChatbotMenu = () => {
  // Custom hooks for email gate and chatbot UI
  const {
    emailSubmitted,
    email,
    setEmail,
    error,
    handleEmailSubmit,
  } = useEmailGate();

  // Custom hook for chatbot UI logic
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

  const [assistantMode, setAssistantMode] = useState(null); // 'chat' or 'voice'

  return (
    <div className="chatbot-menu">
      {!emailSubmitted ? (
        <EmailGate
          email={email}
          setEmail={setEmail}
          error={error}
          onSubmit={handleEmailSubmit}
        />
      ) : assistantMode === null ? (
        <div className="assistant-choice fade-in">
          <p>How would you like to talk with Johnny's assistant?</p>
          <button onClick={() => setAssistantMode("chat")}>💬 Chat Assistant</button>
          <button onClick={() => setAssistantMode("voice")}>🎙️ Voice Assistant</button>
        </div>
      ) : assistantMode === "chat" ? (
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
                aria-label={`Message from ${msg.sender === "ai" ? "Johnny" : "User"}`}
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
          <button onClick={clearChat} className="clear-button" aria-label="Clear chat">
            RESET
          </button>
          <button onClick={() => setAssistantMode(null)} className="back-button">
            Switch Assistant
          </button>
        </div>
      ) : (
        <div className="voice-menu fade-in" role="region" aria-label="Voice Assistant">
          <VoiceAssistant />
          <button onClick={() => setAssistantMode(null)} className="back-button">
            Switch Assistant
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatbotMenu;
