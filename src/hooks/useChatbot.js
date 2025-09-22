import { useState, useEffect, useRef } from "react";
import { askAssistant } from "../api/assistantClient";

// Key for storing chat history in localStorage
const CHAT_STORAGE_KEY = "chatHistory";

// Initial messages to display when the chatbot is first loaded
const introMessages = [
  {
    id: 1,
    sender: "ai",
    text: "Hey! I'm Johnny's personal chatbot. Ask me anything about his portfolio, skills, projects, or experience! You can type questions or click suggestions below.",
  },
  {
    id: 2,
    sender: "ai",
    text: "💡 Tip: Type 'clear' or 'reset' to start fresh!",
  },
];

// Combined hook: manages state, OpenAI logic, and UI behavior
const useChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  // Load chat history or intro messages on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem(CHAT_STORAGE_KEY);
    if (savedMessages && JSON.parse(savedMessages).length > 0) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages(introMessages);
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(introMessages));
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Auto-scroll on new messages
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Sends user message and gets AI response
  const sendMessage = async (userInput) => {
    if (!userInput.trim()) return;

    // Check if user wants to clear/reset chat
    const lowerInput = userInput.toLowerCase().trim();
    if (lowerInput === "clear" || lowerInput === "reset") {
      clearChat();
      return;
    }

    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      text: userInput,
    };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const aiResponse = await askAssistant(userInput);
      const aiMessage = {
        id: messages.length + 2,
        sender: "ai",
        text: aiResponse,
      };
      setMessages((prev) => [...prev, aiMessage]);
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

  // Handle send button or Enter key
  const handleSendMessage = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  // Resets chat
  const clearChat = () => {
    setMessages(introMessages);
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(introMessages));
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

export default useChatbot;
