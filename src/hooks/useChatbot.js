import { useState, useEffect } from "react";
import { fetchOpenAIResponse } from "../api/openai";

const CHAT_STORAGE_KEY = "chatHistory";

const useChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedMessages = localStorage.getItem(CHAT_STORAGE_KEY);

    if (savedMessages && JSON.parse(savedMessages).length > 0) {
      setMessages(JSON.parse(savedMessages));
    } else {
      const welcome = {
        id: 1,
        sender: "ai",
        text: "Hey! I'm Johnny's personal chatbot. You can ask me anything about this portfolio site — my skills, projects, hackathon experience, or background as a developer!",
      };
      const followUp = {
        id: 2,
        sender: "ai",
        text: "Try asking: *What projects has Johnny built?*",
      };
      const introMessages = [welcome, followUp];
      setMessages(introMessages);
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(introMessages));
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  const sendMessage = async (userInput) => {
    if (!userInput.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      text: userInput,
    };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const aiResponse = await fetchOpenAIResponse(userInput);

      setMessages((prev) => [
        ...prev,
        { id: messages.length + 2, sender: "ai", text: aiResponse },
      ]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 2,
          sender: "ai",
          text: "Error: Unable to get response.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    const defaultMessage = {
      id: 1,
      sender: "ai",
      text: "Hey! I'm Johnny's personal chatbot. You can ask me anything about this portfolio site — my skills, projects, hackathon experience, or background as a developer!",
    };
    setMessages([defaultMessage]);
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify([defaultMessage]));
  };

  return { messages, sendMessage, loading, clearChat };
};

export default useChatbot;
