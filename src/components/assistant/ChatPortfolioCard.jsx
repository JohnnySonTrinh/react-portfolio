import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const ChatPortfolioCard = ({ item }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <article
      className={`chat-portfolio-card ${isMinimized ? "minimized" : ""}`}
    >
      <div className="chat-portfolio-toolbar">
        <div className="chat-portfolio-header">
          <h4>{item.title}</h4>
          {item.subtitle ? <p>{item.subtitle}</p> : null}
        </div>
        <button
          type="button"
          className="chat-portfolio-toggle"
          onClick={() => setIsMinimized((value) => !value)}
          aria-expanded={!isMinimized}
          aria-label={isMinimized ? `Expand ${item.title}` : `Minimize ${item.title}`}
        >
          {isMinimized ? (
            <FaChevronDown aria-hidden="true" />
          ) : (
            <FaChevronUp aria-hidden="true" />
          )}
        </button>
      </div>

      {!isMinimized && item.image ? (
        <img
          src={item.image}
          alt={item.title}
          className="chat-portfolio-image"
          loading="lazy"
        />
      ) : null}
      {!isMinimized ? (
        <div className="chat-portfolio-content">
          <p className="chat-portfolio-description">{item.description}</p>
          {item.techStack?.length > 0 ? (
            <div className="chat-portfolio-tags">
              {item.techStack.slice(0, 4).map((tech) => (
                <span key={tech.title} className="chat-portfolio-tag">
                  {tech.title}
                </span>
              ))}
            </div>
          ) : null}
          <div className="chat-portfolio-links">
            {item.secondaryLink ? (
              <a
                href={item.secondaryLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.secondaryLabel}
              </a>
            ) : null}
            {item.primaryLink ? (
              <a
                href={item.primaryLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.primaryLabel}
              </a>
            ) : null}
          </div>
        </div>
      ) : null}
    </article>
  );
};

export default ChatPortfolioCard;
