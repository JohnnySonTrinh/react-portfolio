import { useState, useEffect } from "react";
import { fetchOpenAIResponse } from "../api/openai";

const CHAT_STORAGE_KEY = "chatHistory";

const introMessages = [
  {
    id: 1,
    sender: "ai",
    text: "Hey! I'm Johnny's personal chatbot. You can ask me anything about this portfolio site, my skills, projects, hackathon experience, or background as a developer!",
  },
  {
    id: 2,
    sender: "ai",
    text: "You can type any question about Johnny or just click one of the suggestions below!",
  },
];

const useChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedMessages = localStorage.getItem(CHAT_STORAGE_KEY);

    if (savedMessages && JSON.parse(savedMessages).length > 0) {
      setMessages(JSON.parse(savedMessages));
    } else {
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
    setMessages(introMessages);
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(introMessages));
  };

  return { messages, sendMessage, loading, clearChat };
};

export default useChatbot;
