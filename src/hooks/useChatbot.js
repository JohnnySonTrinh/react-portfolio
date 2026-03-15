import { useEffect, useRef, useState } from "react";
import { askAssistantStream } from "../api/assistantClient";

const CHAT_STORAGE_KEY = "chatHistory";
const STREAM_FLUSH_INTERVAL_MS = 45;
const STREAM_IMMEDIATE_FLUSH_PATTERN = /[\n.!?:,]$/;
const STREAM_BUFFER_LIMIT = 24;

const introMessages = [
  {
    id: 1,
    sender: "ai",
    text: "Hey! I'm Johnny's personal chatbot. Ask me anything about his portfolio, skills, projects, or experience! You can type questions or click suggestions below.",
    ctas: [],
    isStreaming: false,
  },
  {
    id: 2,
    sender: "ai",
    text: "Tip: Type 'clear' or 'reset' to start fresh!",
    ctas: [],
    isStreaming: false,
  },
];

const normalizeMessages = (items = []) =>
  items.map((item) => ({
    ...item,
    ctas: item.ctas || [],
    isStreaming: false,
  }));

const useChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  const abortControllerRef = useRef(null);
  const nextMessageIdRef = useRef(introMessages.length + 1);
  const pendingChunkRef = useRef("");
  const flushTimeoutRef = useRef(null);

  const getNextMessageId = () => {
    const nextId = nextMessageIdRef.current;
    nextMessageIdRef.current += 1;
    return nextId;
  };

  const abortActiveRequest = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  };

  const clearFlushTimeout = () => {
    if (flushTimeoutRef.current) {
      clearTimeout(flushTimeoutRef.current);
      flushTimeoutRef.current = null;
    }
  };

  const flushPendingChunk = (messageId) => {
    const pendingChunk = pendingChunkRef.current;
    if (!pendingChunk) {
      return;
    }

    pendingChunkRef.current = "";
    clearFlushTimeout();

    setMessages((prev) =>
      prev.map((message) =>
        message.id === messageId
          ? {
              ...message,
              text: `${message.text}${pendingChunk}`,
            }
          : message
      )
    );
  };

  const scheduleChunkFlush = (messageId, chunk) => {
    pendingChunkRef.current += chunk;

    if (
      STREAM_IMMEDIATE_FLUSH_PATTERN.test(chunk) ||
      pendingChunkRef.current.length >= STREAM_BUFFER_LIMIT
    ) {
      flushPendingChunk(messageId);
      return;
    }

    if (!flushTimeoutRef.current) {
      flushTimeoutRef.current = setTimeout(() => {
        flushPendingChunk(messageId);
      }, STREAM_FLUSH_INTERVAL_MS);
    }
  };

  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem(CHAT_STORAGE_KEY);
      if (savedMessages && JSON.parse(savedMessages).length > 0) {
        const normalizedMessages = normalizeMessages(JSON.parse(savedMessages));
        setMessages(normalizedMessages);
        const highestId = normalizedMessages.reduce(
          (maxId, message) => Math.max(maxId, message.id || 0),
          0
        );
        nextMessageIdRef.current = highestId + 1;
      } else {
        setMessages(introMessages);
        localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(introMessages));
      }
    } catch {
      setMessages(introMessages);
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(introMessages));
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0 && !messages.some((message) => message.isStreaming)) {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    return () => {
      abortActiveRequest();
      clearFlushTimeout();
    };
  }, []);

  const clearChat = () => {
    abortActiveRequest();
    clearFlushTimeout();
    pendingChunkRef.current = "";
    nextMessageIdRef.current = introMessages.length + 1;
    setMessages(introMessages);
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(introMessages));
    setLoading(false);
  };

  const sendMessage = async (userInput) => {
    if (!userInput.trim() || loading) {
      return;
    }

    const lowerInput = userInput.toLowerCase().trim();
    if (lowerInput === "clear" || lowerInput === "reset") {
      clearChat();
      return;
    }

    const userMessage = {
      id: getNextMessageId(),
      sender: "user",
      text: userInput,
      ctas: [],
      isStreaming: false,
    };

    const aiMessageId = getNextMessageId();
    const aiMessage = {
      id: aiMessageId,
      sender: "ai",
      text: "",
      ctas: [],
      isStreaming: true,
    };

    setMessages((prev) => [...prev, userMessage, aiMessage]);
    setLoading(true);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    try {
      await askAssistantStream(userInput, {
        signal: abortController.signal,
        onText: (chunk) => {
          scheduleChunkFlush(aiMessageId, chunk);
        },
        onDone: ({ text, ctas }) => {
          flushPendingChunk(aiMessageId);
          setMessages((prev) =>
            prev.map((message) =>
              message.id === aiMessageId
                ? {
                    ...message,
                    text: text || message.text,
                    ctas,
                    isStreaming: false,
                  }
                : message
            )
          );
          setLoading(false);
          abortControllerRef.current = null;
        },
      });
    } catch (error) {
      if (error.name === "AbortError") {
        clearFlushTimeout();
        pendingChunkRef.current = "";
        return;
      }

      console.error("Error fetching AI response:", error);
      clearFlushTimeout();
      pendingChunkRef.current = "";
      setMessages((prev) =>
        prev.map((message) =>
          message.id === aiMessageId
            ? {
                ...message,
                text: "Error: Unable to get response.",
                ctas: [],
                isStreaming: false,
              }
            : message
        )
      );
      setLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleSendMessage = () => {
    if (!input.trim() || loading) {
      return;
    }

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

export default useChatbot;
