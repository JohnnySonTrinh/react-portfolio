import { useState, useEffect } from "react";
import { fetchOpenAIResponse } from "../api/openai";

const CHAT_STORAGE_KEY = "chatHistory";

const useChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load chat history from localStorage when the chatbot initializes
  useEffect(() => {
    const savedMessages = localStorage.getItem(CHAT_STORAGE_KEY);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  // Save messages to localStorage whenever the chat updates
  useEffect(() => {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  // Function to send a message
  const sendMessage = async (userInput) => {
    if (!userInput.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      text: userInput,
    };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    // Show "Typing..." before AI responds
    setMessages((prev) => [
      ...prev,
      {
        id: messages.length + 2,
        sender: "ai",
        text: "Typing...",
        isTyping: true,
      },
    ]);

    try {
      const aiResponse = await fetchOpenAIResponse(userInput);

      setMessages((prev) =>
        prev
          .filter((msg) => !msg.isTyping)
          .concat({ id: messages.length + 3, sender: "ai", text: aiResponse })
      );
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setMessages((prev) =>
        prev
          .filter((msg) => !msg.isTyping)
          .concat({
            id: messages.length + 3,
            sender: "ai",
            text: "Error: Unable to get response.",
          })
      );
    } finally {
      setLoading(false);
    }
  };

  return { messages, sendMessage, loading };
};

export default useChatbot;
