import { useCallback, useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";

const isFinalTranscriptMessage = (message) =>
  message.type === "transcript" && message.transcriptType === "final";

const isAssistantSpeechUpdate = (message) =>
  message.type === "speech-update" && message.role === "assistant";

const createTranscriptMessage = (message) => ({
  role: message.role,
  text: message.transcript,
});

const useVoiceAssistant = () => {
  const vapiRef = useRef(null);
  const callRef = useRef(null);
  const chatEndRef = useRef(null);

  const [inCall, setInCall] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isAssistantTyping, setIsAssistantTyping] = useState(false);

  const resetCallState = useCallback(() => {
    callRef.current = null;
    setInCall(false);
    setIsAssistantTyping(false);
  }, []);

  const handleCallStart = useCallback((call) => {
    callRef.current = call;
    setInCall(true);
  }, []);

  const handleVapiMessage = useCallback((message) => {
    if (isFinalTranscriptMessage(message)) {
      setMessages((prev) => [...prev, createTranscriptMessage(message)]);
    }

    if (isAssistantSpeechUpdate(message)) {
      setIsAssistantTyping(message.status === "started");
    }
  }, []);

  const handleCallEnd = useCallback(() => {
    resetCallState();
  }, [resetCallState]);

  useEffect(() => {
    // Keep the Vapi client setup in one place so start/end actions only deal with call control.
    const vapi = new Vapi(process.env.REACT_APP_VAPI_PUBLIC_KEY);
    vapiRef.current = vapi;

    vapi.on("call-start", handleCallStart);
    vapi.on("message", handleVapiMessage);
    vapi.on("call-end", handleCallEnd);

    return () => {
      vapi.stop();
      resetCallState();
    };
  }, [handleCallEnd, handleCallStart, handleVapiMessage, resetCallState]);

  useEffect(() => {
    // Scroll the transcript as new final messages arrive.
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const startCall = () => {
    if (vapiRef.current) {
      vapiRef.current.start(process.env.REACT_APP_VAPI_AGENT_ID);
    }
  };

  const endCall = () => {
    if (vapiRef.current) {
      vapiRef.current.stop();
    }
  };

  return {
    inCall,
    startCall,
    endCall,
    messages,
    isAssistantTyping,
    chatEndRef,
  };
};

export default useVoiceAssistant;
