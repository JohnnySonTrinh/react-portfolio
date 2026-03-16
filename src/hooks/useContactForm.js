import { useState } from "react";
import DOMPurify from "dompurify";
import emailjs from "emailjs-com";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validateContactForm = ({ name, email, message }) => {
  const errors = {};

  if (!name.trim()) {
    errors.name = "Name is required";
  }

  if (!email.trim()) {
    errors.email = "Email is required";
  } else if (!isValidEmail(email)) {
    errors.email = "Invalid email format";
  }

  if (!message.trim()) {
    errors.message = "Message is required";
  }

  return errors;
};

// Sanitize user input before sending it to EmailJS so the payload stays predictable.
const sanitizeContactFormData = ({ name, email, message }) => ({
  name: `Name: ${DOMPurify.sanitize(name)}`,
  email: `Email: ${DOMPurify.sanitize(email)}`,
  message: `Message: ${DOMPurify.sanitize(message)}`,
});

// Keep the EmailJS env lookup in one place so submit logic stays focused on state changes.
const getEmailJsConfig = () => {
  const {
    REACT_APP_EMAILJS_SERVICE_ID: serviceID,
    REACT_APP_EMAILJS_TEMPLATE_ID: templateID,
    REACT_APP_EMAILJS_USER_ID: userID,
  } = process.env;

  return {
    serviceID,
    templateID,
    userID,
  };
};

export const useContactForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    // Clear stale submit failures once the user starts editing toward a retry.
    setSubmitError("");
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validateErrors = validateContactForm(formData);

    if (Object.keys(validateErrors).length) {
      setErrors(validateErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});
    setSubmitError("");

    const sanitizedData = sanitizeContactFormData(formData);
    const { serviceID, templateID, userID } = getEmailJsConfig();

    emailjs
      .send(serviceID, templateID, sanitizedData, userID)
      .then(({ text }) => {
        console.log("Email sent successfully!", text);
        // Reset the form after a successful send so the success state is the only thing left on screen.
        setFormData(initialState);
        setErrors({});
        setSubmitError("");
        setIsSent(true);
      })
      .catch((error) => {
        console.error("Email sending failed", error);
        setSubmitError(
          "Something went wrong while sending your message. Please try again."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    formData,
    errors,
    isLoading,
    isSent,
    submitError,
    handleChange,
    handleSubmit,
  };
};
