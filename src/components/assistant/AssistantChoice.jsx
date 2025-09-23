import "../../styles/assistantChoice.css";
import { TooltipWrapper } from "../common";

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
        <TooltipWrapper title="Working on a new model">
          <button
            className="button-disabled"
            onClick={() => onSelect("voice")}
            aria-label="Talk to assistant using your voice"
            disabled
          >
            Voice
          </button>
        </TooltipWrapper>
      </div>
    </section>
  );
};

export default AssistantChoice;
