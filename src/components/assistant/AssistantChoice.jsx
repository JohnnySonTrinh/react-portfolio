import "../../styles/assistantChoice.css";

const AssistantChoice = ({ onSelect }) => {
  return (
    <div className="assistant-choice fade-in">
      <p>How would you like to interact with Johnny's assistant?</p>
      <div className="assistant-buttons">
        <button onClick={() => onSelect("chat")} aria-label="Type your questions to Johnny's assistant">
          Type
        </button>
        <button onClick={() => onSelect("voice")} aria-label="Talk to Johnny's assistant using your voice">
          Talk
        </button>
      </div>
    </div>
  );
};

export default AssistantChoice;
