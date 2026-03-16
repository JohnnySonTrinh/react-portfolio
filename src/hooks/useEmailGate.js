import { useEffect, useState } from "react";

const EMAIL_GATE_STORAGE_KEY = "chatbot_email_gate";

const getDefaultEmailGateState = () => ({
  email: "",
  emailSubmitted: false,
});

// Read and normalize the saved gate state so the hook always starts from one shape.
const readEmailGateState = () => {
  try {
    const saved = localStorage.getItem(EMAIL_GATE_STORAGE_KEY);

    if (!saved) {
      return getDefaultEmailGateState();
    }

    const parsed = JSON.parse(saved);

    return {
      email: parsed.email || "",
      emailSubmitted: Boolean(parsed.emailSubmitted && parsed.email),
    };
  } catch {
    return getDefaultEmailGateState();
  }
};

const writeEmailGateState = ({ email, emailSubmitted }) => {
  localStorage.setItem(
    EMAIL_GATE_STORAGE_KEY,
    JSON.stringify({
      email,
      emailSubmitted,
    })
  );
};

const isValidEmail = (email) => /^[^@]+@[^@]+\.[^@]+$/.test(email);

const useEmailGate = () => {
  const initialState = readEmailGateState();
  const [emailSubmitted, setEmailSubmitted] = useState(
    initialState.emailSubmitted
  );
  const [email, setEmail] = useState(initialState.email);
  const [error, setError] = useState("");

  // Persist the gate state so assistant access survives refreshes and route changes.
  useEffect(() => {
    writeEmailGateState({
      email,
      emailSubmitted,
    });
  }, [email, emailSubmitted]);

  const handleEmailSubmit = () => {
    if (isValidEmail(email)) {
      setError("");
      setEmailSubmitted(true);
    } else {
      setError("Please enter a valid email.");
    }
  };

  const resetEmailGate = () => {
    setEmailSubmitted(false);
    setEmail("");
    setError("");
    localStorage.removeItem(EMAIL_GATE_STORAGE_KEY);
  };

  return {
    emailSubmitted,
    email,
    setEmail,
    error,
    handleEmailSubmit,
    resetEmailGate,
  };
};

export default useEmailGate;
