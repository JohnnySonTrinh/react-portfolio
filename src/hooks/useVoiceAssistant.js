import { useEffect, useRef, useState } from "react";
import Vapi from "@vapi-ai/web";

const useVoiceAssistant = () => {
  const vapiRef = useRef(null);
  const callRef = useRef(null);

  const [isMuted, setIsMuted] = useState(false);
  const [inCall, setInCall] = useState(false);

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
    });

    vapi.on("call-end", () => {
      console.log("🏁 Call ended");
      callRef.current = null;
      setIsMuted(false);
      setInCall(false);
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

  const toggleMute = () => {
    const call = callRef.current;
    if (!call) return;

    if (isMuted) {
      call.unmuteMicrophone();
    } else {
      call.muteMicrophone();
    }

    setIsMuted(!isMuted);
  };

  return { isMuted, inCall, startCall, endCall, toggleMute };
};

export default useVoiceAssistant;
