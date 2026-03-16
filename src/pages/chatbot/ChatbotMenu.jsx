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
  } = useEmailGate();

  const [assistantMode, setAssistantMode] = useState(null);

  return (
    <div className="chatbot-menu fade-in" role="main" aria-label="Chatbot Interface">
      {!emailSubmitted ? (
        <EmailGate
          email={email}
          onEmailChange={setEmail}
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

      {emailSubmitted && assistantMode ? (
        <div className="assistant-actions">
          <button
            onClick={() => setAssistantMode(null)}
            className="back-button"
            aria-label="Switch assistant mode"
          >
            Switch Assistant
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ChatbotMenu;
