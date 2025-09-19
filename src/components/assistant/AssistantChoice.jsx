import "../../styles/assistantChoice.css";

const AssistantChoice = ({ onSelect }) => {
  return (
    <section
      className="assistant-choice fade-in"
      aria-labelledby="assistant-choice-heading"
    >
      <p id="assistant-choice-heading">
        How would you like to interact with assistant?
      </p>
      <div
        className="assistant-buttons"
        role="group"
        aria-label="Interaction options"
      >
        <button
          onClick={() => onSelect("chat")}
          aria-label="Type your questions to assistant"
        >
          Chat
        </button>
        <button
          onClick={() => onSelect("voice")}
          aria-label="Talk to assistant using your voice"
        >
          Voice
        </button>
      </div>
    </section>
  );
};

export default AssistantChoice;
