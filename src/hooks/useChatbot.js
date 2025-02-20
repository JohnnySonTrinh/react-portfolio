import { useState } from "react";
import { fetchOpenAIResponse } from "../api/openai";

const useChatbot = () => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "ai", text: "Hello! I'm AI Johnny. Ask me anything!" },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (userText) => {
    if (!userText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      text: userText,
    };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    const aiResponse = await fetchOpenAIResponse(userText);
    setMessages((prev) => [
      ...prev,
      { id: messages.length + 2, sender: "ai", text: aiResponse },
    ]);

    setLoading(false);
  };

  return { messages, sendMessage, loading };
};

export default useChatbot;
