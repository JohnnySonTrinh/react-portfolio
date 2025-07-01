import { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";

const useVoiceAssistant = () => {
  const vapiRef = useRef(null);
  const callRef = useRef(null);

  const [inCall, setInCall] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isAssistantTyping, setIsAssistantTyping] = useState(false);

  useEffect(() => {
    const vapi = new Vapi(process.env.REACT_APP_VAPI_PUBLIC_KEY);
    vapiRef.current = vapi;

    vapi.on("call-start", (call) => {
      console.log("🎙️ Call started");
      callRef.current = call;
      setInCall(true);
    });

    vapi.on("message", (msg) => {
      console.log("📩 Message:", msg);

      if (msg.type === "transcript" && msg.transcriptType === "final") {
        setMessages(prev => [...prev, { role: msg.role, text: msg.transcript }]);
      }

      if (msg.type === "speech-update" && msg.role === "assistant") {
        setIsAssistantTyping(msg.status === "started");
      }
    });

    vapi.on("call-end", () => {
      console.log("🏁 Call ended");
      callRef.current = null;
      setInCall(false);
      setIsAssistantTyping(false);
    });

    return () => {
      vapi.stop();
    };
  }, []);

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
  };
};

export default useVoiceAssistant;
