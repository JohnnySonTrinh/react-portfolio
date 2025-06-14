// src/hooks/useChatbotUI.js
import { useState, useRef, useEffect } from "react";
import useChatbot from "./useChatbot";

const useChatbotUI = () => {
  const { messages, sendMessage, loading, clearChat } = useChatbot();
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  return {
    messages,
    loading,
    input,
    setInput,
    handleSendMessage,
    clearChat,
    chatEndRef,
    sendMessage,
  };
};

export default useChatbotUI;
