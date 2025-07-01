import useVoiceAssistant from "../../hooks/useVoiceAssistant";
import "../../styles/voiceAssistant.css";

const VoiceAssistant = () => {
  const { isMuted, inCall, startCall, endCall, toggleMute } = useVoiceAssistant();

  return (
    <div className="voice-assistant-ui">
      <h2>Voice Assistant</h2>

      {!inCall ? (
        <button
          onClick={startCall}
          aria-label="Start Call"
        >
          Start Call
        </button>
      ) : (
        <>
          <button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute Microphone" : "Mute Microphone"}
          >
            {isMuted ? "Unmute Mic" : "Mute Mic"}
          </button>

          <button
            onClick={endCall}
            aria-label="End Call"
            style={{ fontSize: "1.1rem", padding: "0.5rem 1rem", color: "red" }}
          >
            End Call
          </button>
        </>
      )}
    </div>
  );
};

export default VoiceAssistant;
