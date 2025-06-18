import { useState, useEffect } from "react";
import { fetchOpenAIResponse } from "../api/openai";

// Key for storing chat history in localStorage
const CHAT_STORAGE_KEY = "chatHistory";

// Initial messages to display when the chatbot is first loaded
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

// Custom hook to manage chatbot state and interactions
const useChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load chat history from localStorage or set initial messages
  useEffect(() => {
    const savedMessages = localStorage.getItem(CHAT_STORAGE_KEY);

    if (savedMessages && JSON.parse(savedMessages).length > 0) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages(introMessages);
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(introMessages));
    }
  }, []);

  // Save chat history to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Function to send user input to OpenAI and get a response
  const sendMessage = async (userInput) => {
    if (!userInput.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      text: userInput,
    };
    setMessages((prev) => [...prev, userMessage]); // Add user message to chat history
    setLoading(true);

    // Clear the input field (if using a form, this would be handled by the form state)
    try {
      const aiResponse = await fetchOpenAIResponse(userInput);

      // Add AI response to chat history
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

  // Function to clear chat history and reset to initial messages
  const clearChat = () => {
    setMessages(introMessages);
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(introMessages)); // Reset chat history in localStorage
  };

  return { messages, sendMessage, loading, clearChat };
};

export default useChatbot;
