import { useState } from "react";
import DOMPurify from "dompurify";
import emailjs from "emailjs-com";

export const useContactForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { name, email, message } = formData;
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Invalid email format";
    }
    if (!message.trim()) newErrors.message = "Message is required";

    return newErrors;
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    const validateErrors = validateForm();
    if (Object.keys(validateErrors).length) {
      setErrors(validateErrors);
      return;
    }

    setIsLoading(true);

    const sanitizedData = {
      name: `Name: ${DOMPurify.sanitize(formData.name)}`,
      email: `Email: ${DOMPurify.sanitize(formData.email)}`,
      message: `Message: ${DOMPurify.sanitize(formData.message)}`,
    };

    const {
      REACT_APP_EMAILJS_SERVICE_ID: serviceID,
      REACT_APP_EMAILJS_TEMPLATE_ID: templateID,
      REACT_APP_EMAILJS_USER_ID: userID,
    } = process.env;

    emailjs
      .send(serviceID, templateID, sanitizedData, userID)
      .then(({ text }) => {
        console.log("Email sent successfully!", text);
        setFormData(initialState);
        setErrors({});
        setIsSent(true);
      })
      .catch((error) => {
        console.error("Email sending failed", error);
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
    handleChange,
    handleSubmit,
  };
};
