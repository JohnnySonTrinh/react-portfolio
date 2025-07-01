import useVoiceAssistant from "../../hooks/useVoiceAssistant";
import "../../styles/voiceAssistant.css";

const VoiceAssistant = () => {
  const { inCall, startCall, endCall, messages, isAssistantTyping } = useVoiceAssistant();

  return (
    <div className="voice-assistant-ui">
      <h2>Voice Assistant</h2>

      {!inCall ? (
        <button onClick={startCall}>Start Call</button>
      ) : (
        <button onClick={endCall}>End Call</button>
      )}

      {inCall && (
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
            <div className="chat-bubble ai typing">Typing...</div>
          )}
        </div>
      )}
    </div>
  );
};

export default VoiceAssistant;
