import "../../styles/emailGate.css";

const EmailGate = ({ email, setEmail, error, onSubmit }) => {
  return (
    <div className="email-gate">
      <div className="email-intro-box">
        <h1 className="email-intro-title">Personal Assistant</h1>
        <p className="email-intro-text">
          Meet Johnny's Personal Assistant! This AI chatbot can help you explore
          his skills, projects, hackathon experience, or anything else you'd
          like to know about his developer journey.
        </p>
        <p className="email-intro-note">Just enter your email to begin!</p>
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
            SUBMIT
          </button>
        </div>
      </div>
      {error && <p className="email-error">{error}</p>}
    </div>
  );
};

export default EmailGate;
