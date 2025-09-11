import { useState } from "react";
import EmailGate from "./EmailGate";
import useEmailGate from "../../hooks/useEmailGate";
import ChatAssistant from "../../components/assistant/ChatAssistant";
import VoiceAssistant from "../../components/assistant/VoiceAssistant";
import AssistantChoice from "../../components/assistant/AssistantChoice";

const ChatbotMenu = () => {
  const { emailSubmitted, email, setEmail, error, handleEmailSubmit } =
    useEmailGate();

  const [assistantMode, setAssistantMode] = useState(null);

  return (
    <div className="chatbot-menu" role="main" aria-label="Chatbot Interface">
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
          <button
            onClick={() => setAssistantMode(null)}
            className="back-button"
            aria-label="Switch to voice assistant"
          >
            Switch Assistant
          </button>
        </>
      ) : assistantMode === "voice" ? (
        <>
          <VoiceAssistant />
          <button
            onClick={() => setAssistantMode(null)}
            className="back-button"
            aria-label="Switch to chat assistant"
          >
            Switch Assistant
          </button>
        </>
      ) : (
        <AssistantChoice onSelect={setAssistantMode} />
      )}
    </div>
  );
};

export default ChatbotMenu;
