import ReactMarkdown from "react-markdown";
import { useLocation, useNavigate } from "react-router-dom";
import useChatbot from "../../hooks/useChatbot";
import { useAchievements } from "../../hooks/achievements/useAchievement";
import { getSuggestionsByRoute } from "../../data/chatSuggestions";
import useProfileData from "../../hooks/useProfileData";
import { matchChatPortfolioItems } from "../../utils/matchChatPortfolioItems";
import ChatPortfolioCard from "./ChatPortfolioCard";
import "../../styles/chatAssistant.css";

const CHAT_ACHIEVEMENT_IDS = ["chat_messages", "conversation_starter"];

const isExternalLink = (href = "") =>
  /^https?:\/\//i.test(href) || href.startsWith("//");

const getMessageLabel = (sender) =>
  `Message from ${sender === "ai" ? "Johnny's assistant" : "You"}`;

const trackChatAchievements = (updateProgress) => {
  CHAT_ACHIEVEMENT_IDS.forEach((id) => {
    updateProgress(id);
  });
};

const LiveStatus = () => (
  <div className="chat-live-status" role="status" aria-live="polite">
    <span className="chat-live-dot"></span>
    Johnny's assistant is responding live...
  </div>
);

const ChatMessage = ({ msg, projects, hackathons, onCtaClick }) => {
  const matchedItems =
    msg.sender === "ai" && !msg.isStreaming
      ? matchChatPortfolioItems(msg.text, projects, hackathons) || []
      : [];

  return (
    <div className={`chat-message ${msg.sender}`}>
      <div
        className={`chat-bubble ${msg.sender} ${
          msg.isStreaming ? "streaming" : ""
        }`}
        role="article"
        aria-label={getMessageLabel(msg.sender)}
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
                onClick={() => onCtaClick(cta.route)}
                aria-label={cta.label}
              >
                {cta.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      {matchedItems.map((item) => (
        <ChatPortfolioCard key={`${item.type}:${item.title}`} item={item} />
      ))}
    </div>
  );
};

const SuggestionButtons = ({ suggestions, onSuggestionClick }) => (
  <div
    className="suggestion-buttons"
    role="group"
    aria-label="Suggested questions"
  >
    {suggestions.map((suggestion, index) => (
      <button
        key={index}
        onClick={() => onSuggestionClick(suggestion)}
        aria-label={`Send suggested message: ${suggestion}`}
      >
        {suggestion}
      </button>
    ))}
  </div>
);

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
  const shouldShowSuggestions =
    followUpSuggestions.length > 0 && messages.length <= 2;

  const handleCtaClick = (route) => {
    navigate(route);
  };

  // Keep achievement updates in one place so typed and suggested prompts stay aligned.
  const handleSendWithTracking = () => {
    handleSendMessage();
    trackChatAchievements(updateProgress);
  };

  const handleSuggestionClick = (suggestion) => {
    sendMessage(suggestion);
    trackChatAchievements(updateProgress);
  };

  return (
    <div
      className="chat-menu fade-in"
      role="region"
      aria-label="Johnny's Chat Assistant"
    >
      <div className={`chat-box ${isStreaming ? "live" : ""}`} role="log" aria-live="polite">
        {isStreaming ? <LiveStatus /> : null}
        {messages.map((msg) => (
          <ChatMessage
            key={msg.id}
            msg={msg}
            projects={projects}
            hackathons={hackathons}
            onCtaClick={handleCtaClick}
          />
        ))}
        <div ref={chatEndRef} />
        {shouldShowSuggestions ? (
          <SuggestionButtons
            suggestions={followUpSuggestions}
            onSuggestionClick={handleSuggestionClick}
          />
        ) : null}
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
