import { useState } from "react";
import EmailGate from "./EmailGate";
import useEmailGate from "../../hooks/useEmailGate";
import ChatAssistant from "../../components/assistant/ChatAssistant";
import VoiceAssistant from "../../components/assistant/VoiceAssistant";
import AssistantChoice from "../../components/assistant/AssistantChoice";

const ChatbotMenu = () => {
  const {
    emailSubmitted,
    email,
    setEmail,
    error,
    handleEmailSubmit,
    resetEmailGate,
  } = useEmailGate();

  const [assistantMode, setAssistantMode] = useState(null);

  const handleResetEmailGate = () => {
    setAssistantMode(null);
    resetEmailGate();
  };

  return (
    <div className="chatbot-menu fade-in" role="main" aria-label="Chatbot Interface">
      {!emailSubmitted ? (
        <EmailGate
          email={email}
          setEmail={setEmail}
          error={error}
          onSubmit={handleEmailSubmit}
        />
      ) : assistantMode === "chat" ? (
        <>
          <ChatAssistant />
        </>
      ) : assistantMode === "voice" ? (
        <>
          <VoiceAssistant />
        </>
      ) : (
        <AssistantChoice onSelect={setAssistantMode} />
      )}

      {emailSubmitted ? (
        <div className="assistant-actions">
          {assistantMode ? (
            <button
              onClick={() => setAssistantMode(null)}
              className="back-button"
              aria-label="Switch assistant mode"
            >
              Switch Assistant
            </button>
          ) : null}
          <button
            onClick={handleResetEmailGate}
            className="change-email-button"
            aria-label="Change saved chatbot email"
          >
            Change Email
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ChatbotMenu;
