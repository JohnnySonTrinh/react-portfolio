import useVoiceAssistant from "../../hooks/useVoiceAssistant";
import "../../styles/voiceAssistant.css";

const VoiceAssistant = () => {
  const {
    inCall,
    startCall,
    endCall,
    messages,
    isAssistantTyping,
    chatEndRef,
  } = useVoiceAssistant();

  return (
    <section
      className="voice-assistant-ui"
      aria-labelledby="voice-assistant-heading"
    >
      {!inCall && (
        <p className="voice-intro">
          Click below to start chatting with Johnny's assistant using your voice.
        </p>
      )}
      {(inCall || messages.length > 0) && (
        <div className="chat-messages" role="log" aria-live="polite">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-bubble ${msg.role === "user" ? "user" : "ai"}`}
              role="article"
              aria-label={`Message from ${msg.role === "user" ? "you" : "Johnny's assistant"}`}
            >
              {msg.text}
            </div>
          ))}
          {isAssistantTyping && (
            <div className="chat-bubble ai typing" role="status" aria-live="assertive">
              Speaking...
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      )}
      <button
        onClick={inCall ? endCall : startCall}
        className={inCall ? "end-call-button" : "start-call-button"}
        aria-label={inCall ? "End voice call with Johnny's assistant" : "Start voice call with Johnny's assistant"}
      >
        {inCall ? "End Call" : "Start Call"}
      </button>
    </section>
  );
};

export default VoiceAssistant;
