import { TooltipWrapper } from "../../components/common";
import { useContactForm } from "../../hooks/useContactForm";

const ContactMenu = () => {
  const initialState = {
    name: "",
    email: "",
    message: "",
  };

  const { formData, errors, isLoading, isSent, handleChange, handleSubmit } =
    useContactForm(initialState);

  return (
    <div className="contact-menu fade-in">
      {!isSent && (
        <form onSubmit={handleSubmit}>
          <h2>Contact Me</h2>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "error" : ""}
              disabled={isLoading}
            />
            {errors.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "error" : ""}
              disabled={isLoading}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className={errors.message ? "error" : ""}
              disabled={isLoading}
            ></textarea>
            {errors.message && (
              <span className="error-message">{errors.message}</span>
            )}
          </div>
          <TooltipWrapper title="Ask for Resume/CV if needed">
            <button type="submit" disabled={isLoading}>
              {isLoading ? "SENDING..." : "SUBMIT"}
            </button>
          </TooltipWrapper>
        </form>
      )}
      {isSent && (
        <div className="success-message">
          <p>SUCCESS!</p>
          <p>Your message has been successfully sent!</p>
          <p>You can safely leave this page.</p>
        </div>
      )}
    </div>
  );
};

export default ContactMenu;
