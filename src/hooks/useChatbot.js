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

const getDefaultMessages = () => normalizeMessages(introMessages);

const normalizeMessages = (items = []) =>
  items.map((item) => ({
    ...item,
    ctas: item.ctas || [],
    isStreaming: false,
  }));

const readStoredMessages = () => {
  try {
    const savedMessages = localStorage.getItem(CHAT_STORAGE_KEY);

    if (!savedMessages) {
      return getDefaultMessages();
    }

    const parsedMessages = JSON.parse(savedMessages);

    if (!Array.isArray(parsedMessages) || parsedMessages.length === 0) {
      return getDefaultMessages();
    }

    return normalizeMessages(parsedMessages);
  } catch {
    return getDefaultMessages();
  }
};

const writeStoredMessages = (messages) => {
  localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
};

const getHighestMessageId = (messages) =>
  messages.reduce((maxId, message) => Math.max(maxId, message.id || 0), 0);

const getResetMessageId = () => introMessages.length + 1;

const createUserMessage = (id, text) => ({
  id,
  sender: "user",
  text,
  ctas: [],
  isStreaming: false,
});

const createAssistantMessage = (id) => ({
  id,
  sender: "ai",
  text: "",
  ctas: [],
  isStreaming: true,
});

const updateMessageById = (messages, messageId, updater) =>
  messages.map((message) =>
    message.id === messageId ? updater(message) : message
  );

const isResetCommand = (input) => {
  const normalizedInput = input.toLowerCase().trim();

  return normalizedInput === "clear" || normalizedInput === "reset";
};

const useChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  const abortControllerRef = useRef(null);
  const nextMessageIdRef = useRef(getResetMessageId());
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

  const clearPendingChunkState = () => {
    pendingChunkRef.current = "";
    clearFlushTimeout();
  };

  const flushPendingChunk = (messageId) => {
    const pendingChunk = pendingChunkRef.current;
    if (!pendingChunk) {
      return;
    }

    pendingChunkRef.current = "";
    clearFlushTimeout();

    setMessages((prev) =>
      updateMessageById(prev, messageId, (message) => ({
        ...message,
        text: `${message.text}${pendingChunk}`,
      }))
    );
  };

  const finalizeAssistantMessage = (messageId, { text, ctas }) => {
    setMessages((prev) =>
      updateMessageById(prev, messageId, (message) => ({
        ...message,
        text: text || message.text,
        ctas,
        isStreaming: false,
      }))
    );
  };

  const failAssistantMessage = (messageId) => {
    setMessages((prev) =>
      updateMessageById(prev, messageId, (message) => ({
        ...message,
        text: "Error: Unable to get response.",
        ctas: [],
        isStreaming: false,
      }))
    );
  };

  const resetRequestState = () => {
    clearPendingChunkState();
    abortControllerRef.current = null;
    setLoading(false);
  };

  const restoreStoredMessages = () => {
    const storedMessages = readStoredMessages();

    setMessages(storedMessages);
    nextMessageIdRef.current = getHighestMessageId(storedMessages) + 1;

    if (storedMessages.length === introMessages.length) {
      writeStoredMessages(storedMessages);
    }
  };

  const resetChatState = () => {
    const defaultMessages = getDefaultMessages();

    nextMessageIdRef.current = getResetMessageId();
    setMessages(defaultMessages);
    writeStoredMessages(defaultMessages);
    setLoading(false);
  };

  const appendPendingMessages = (userInput) => {
    const userMessage = createUserMessage(getNextMessageId(), userInput);
    const aiMessageId = getNextMessageId();
    const aiMessage = createAssistantMessage(aiMessageId);

    setMessages((prev) => [...prev, userMessage, aiMessage]);

    return aiMessageId;
  };

  const startStreamingRequest = async (userInput, aiMessageId) => {
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    await askAssistantStream(userInput, {
      signal: abortController.signal,
      onText: (chunk) => {
        scheduleChunkFlush(aiMessageId, chunk);
      },
      onDone: ({ text, ctas }) => {
        flushPendingChunk(aiMessageId);
        finalizeAssistantMessage(aiMessageId, { text, ctas });
        resetRequestState();
      },
    });
  };

  useEffect(() => {
    restoreStoredMessages();
  }, []);

  // Persist only completed messages so reloads never restore a partially streamed reply.
  useEffect(() => {
    if (messages.length > 0 && !messages.some((message) => message.isStreaming)) {
      writeStoredMessages(messages);
    }
  }, [messages]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    return () => {
      abortActiveRequest();
      clearPendingChunkState();
    };
  }, []);

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

  const clearChat = () => {
    abortActiveRequest();
    clearPendingChunkState();
    resetChatState();
  };

  const sendMessage = async (userInput) => {
    if (!userInput.trim() || loading) {
      return;
    }

    if (isResetCommand(userInput)) {
      clearChat();
      return;
    }

    const aiMessageId = appendPendingMessages(userInput);
    setLoading(true);

    try {
      await startStreamingRequest(userInput, aiMessageId);
    } catch (error) {
      if (error.name === "AbortError") {
        clearPendingChunkState();
        return;
      }

      console.error("Error fetching AI response:", error);
      failAssistantMessage(aiMessageId);
      resetRequestState();
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
