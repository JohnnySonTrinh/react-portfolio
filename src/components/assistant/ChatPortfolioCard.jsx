const ChatPortfolioCard = ({ item }) => {
  return (
    <article className="chat-portfolio-card">
      {item.image ? (
        <img
          src={item.image}
          alt={item.title}
          className="chat-portfolio-image"
          loading="lazy"
        />
      ) : null}
      <div className="chat-portfolio-content">
        <div className="chat-portfolio-header">
          <h4>{item.title}</h4>
          {item.subtitle ? <p>{item.subtitle}</p> : null}
        </div>
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
    </article>
  );
};

export default ChatPortfolioCard;
