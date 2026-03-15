import ReactMarkdown from "react-markdown";
import { useLocation, useNavigate } from "react-router-dom";
import useChatbot from "../../hooks/useChatbot";
import { useAchievements } from "../../hooks/achievements/useAchievement";
import { getSuggestionsByRoute } from "../../data/chatSuggestions";
import useProfileData from "../../hooks/useProfileData";
import { matchChatPortfolioItems } from "../../utils/matchChatPortfolioItems";
import ChatPortfolioCard from "./ChatPortfolioCard";
import "../../styles/chatAssistant.css";

const isExternalLink = (href = "") =>
  /^https?:\/\//i.test(href) || href.startsWith("//");

const ChatAssistant = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    messages,
    loading,
    input,
    setInput,
    handleSendMessage,
    clearChat,
    chatEndRef,
    sendMessage,
  } = useChatbot();

  const { updateProgress } = useAchievements();
  const { projects, hackathons } = useProfileData();
  const followUpSuggestions = getSuggestionsByRoute(location.pathname);
  const isStreaming = loading || messages.some((message) => message.isStreaming);

  const handleCtaClick = (route) => {
    navigate(route);
  };

  // Track chat message achievements
  const handleSendWithTracking = () => {
    handleSendMessage();
    // Update both chat achievements
    updateProgress("chat_messages"); // For 5 messages achievement
    updateProgress("conversation_starter"); // For 10 messages achievement
  };

  // Track suggestion button messages
  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
    // Update both chat achievements
    updateProgress("chat_messages"); // For 5 messages achievement
    updateProgress("conversation_starter"); // For 10 messages achievement
  };

  return (
    <div
      className="chat-menu fade-in"
      role="region"
      aria-label="Johnny's Chat Assistant"
    >
      <div className={`chat-box ${isStreaming ? "live" : ""}`} role="log" aria-live="polite">
          {isStreaming ? (
            <div className="chat-live-status" role="status" aria-live="polite">
              <span className="chat-live-dot"></span>
              Johnny's assistant is responding live...
            </div>
          ) : null}
          {messages.map((msg) => (
            <div key={msg.id} className={`chat-message ${msg.sender}`}>
              <div
                className={`chat-bubble ${msg.sender} ${
                  msg.isStreaming ? "streaming" : ""
                }`}
                role="article"
                aria-label={`Message from ${
                  msg.sender === "ai" ? "Johnny's assistant" : "You"
                }`}
              >
                <div className="chat-markdown">
                  <ReactMarkdown
                    components={{
                      a: ({ href, children, ...props }) => {
                        const external = isExternalLink(href);

                        return (
                          <a
                            {...props}
                            href={href}
                            target={external ? "_blank" : undefined}
                            rel={external ? "noopener noreferrer" : undefined}
                          >
                            {children}
                          </a>
                        );
                      },
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
                {msg.sender === "ai" && !msg.isStreaming && msg.ctas?.length > 0 ? (
                  <div className="chat-cta-group">
                    {msg.ctas.map((cta) => (
                      <button
                        key={cta.route}
                        type="button"
                        className="chat-cta-button"
                        onClick={() => handleCtaClick(cta.route)}
                        aria-label={cta.label}
                      >
                        {cta.label}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
              {msg.sender === "ai" && !msg.isStreaming
                ? matchChatPortfolioItems(msg.text, projects, hackathons).map(
                    (item) => <ChatPortfolioCard key={`${item.type}:${item.title}`} item={item} />
                  )
                : null}
            </div>
          ))}
          <div ref={chatEndRef} />
          {followUpSuggestions.length > 0 && messages.length <= 2 && (
            <div
              className="suggestion-buttons"
              role="group"
              aria-label="Suggested questions"
            >
              {followUpSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
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
          placeholder={loading ? "Assistant is responding live..." : "Type a message..."}
          className="chat-input"
          value={input}
          disabled={loading}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendWithTracking()}
          aria-label="Type a message to Johnny's assistant"
        />
        <button
          className="send-button"
          onClick={handleSendWithTracking}
          disabled={loading}
          aria-label={loading ? "Sending message, please wait" : "Send message"}
        >
          {loading ? "LIVE" : "SEND"}
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
