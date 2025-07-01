import "../../styles/assistantChoice.css";

const AssistantChoice = ({ onSelect }) => {
  return (
    <div className="assistant-choice fade-in">
      <p>How would you like to talk with Johnny's assistant?</p>
      <button onClick={() => onSelect("chat")}>💬 Chat Assistant</button>
      <button onClick={() => onSelect("voice")}>🎙️ Voice Assistant</button>
    </div>
  );
};

export default AssistantChoice;
