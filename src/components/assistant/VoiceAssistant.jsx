import useVoiceAssistant from "../../hooks/useVoiceAssistant";
import "../../styles/voiceAssistant.css";

const VoiceAssistant = () => {
  const { inCall, startCall, endCall, messages, isAssistantTyping } = useVoiceAssistant();

  return (
    <div className="voice-assistant-ui">
      {!inCall && (
        <p className="voice-intro">
          Click below to start chatting with Johnny’s assistant using your voice.
        </p>
      )}

      {(inCall || messages.length > 0) && (
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-bubble ${msg.role === "user" ? "user" : "ai"}`}
            >
              {msg.text}
            </div>
          ))}
          {isAssistantTyping && (
            <div className="chat-bubble ai typing">Speaking...</div>
          )}
        </div>
      )}

      <button
        onClick={inCall ? endCall : startCall}
        className={inCall ? "end-call-button" : "start-call-button"}
      >
        {inCall ? "End Call" : "Start Call"}
      </button>
    </div>
  );
};

export default VoiceAssistant;
