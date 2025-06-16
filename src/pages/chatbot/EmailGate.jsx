const EmailGate = ({ email, setEmail, error, onSubmit }) => {
  return (
    <div className="email-gate">
      <div className="email-intro-box">
        <p className="email-intro-title">Personal Assistant</p>
        <p className="email-intro-text">
          Meet Johnny's Personal Assistant! This AI chatbot can help you explore his skills, projects, hackathon experience, or anything else you'd like to know about his developer journey.
        </p>
        <p className="email-intro-note">
          Just enter your email to begin!
        </p>
        <label htmlFor="email-input" className="email-label">
          Enter your email to start:
        </label>
        <div className="email-box">
          <input
            id="email-input"
            type="email"
            className="email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSubmit()}
            placeholder="your@email.com"
            aria-label="Email input"
          />
          <button className="email-submit-button" onClick={onSubmit}>
            Start Chat
          </button>
        </div>
      </div>
      {error && <p className="email-error">{error}</p>}
    </div>
  );
};

export default EmailGate;
