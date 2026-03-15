import { useEffect, useState } from "react";

const EMAIL_GATE_STORAGE_KEY = "chatbot_email_gate";

const useEmailGate = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(() => {
    try {
      const saved = localStorage.getItem(EMAIL_GATE_STORAGE_KEY);
      if (!saved) {
        return false;
      }

      const parsed = JSON.parse(saved);
      return Boolean(parsed.emailSubmitted && parsed.email);
    } catch {
      return false;
    }
  });
  const [email, setEmail] = useState(() => {
    try {
      const saved = localStorage.getItem(EMAIL_GATE_STORAGE_KEY);
      if (!saved) {
        return "";
      }

      const parsed = JSON.parse(saved);
      return parsed.email || "";
    } catch {
      return "";
    }
  });
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem(
      EMAIL_GATE_STORAGE_KEY,
      JSON.stringify({
        email,
        emailSubmitted,
      })
    );
  }, [email, emailSubmitted]);

  const handleEmailSubmit = () => {
    const isValid = /^[^@]+@[^@]+\.[^@]+$/.test(email);
    if (isValid) {
      setError("");
      setEmailSubmitted(true);
    } else {
      setError("Please enter a valid email.");
    }
  };

  return {
    emailSubmitted,
    email,
    setEmail,
    error,
    handleEmailSubmit,
  };
};

export default useEmailGate;
