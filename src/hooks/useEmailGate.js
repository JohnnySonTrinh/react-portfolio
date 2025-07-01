import { useState } from "react";

const useEmailGate = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

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
