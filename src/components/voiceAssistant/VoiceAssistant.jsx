import { useEffect } from "react";
import { Vapi } from "@vapi-ai/web";

const VoiceAssistant = () => {
  useEffect(() => {
    const vapi = new Vapi({
      apiKey: process.env.REACT_APP_VAPI_PUBLIC_KEY,
    });

    vapi.startConversation({
      agentId: process.env.REACT_APP_VAPI_AGENT_ID,
    });

    return () => {
      vapi.stopConversation();
    };
  }, []);

  return (
    <div>
      <h2>🎤 Ask me anything!</h2>
    </div>
  );
};

export default VoiceAssistant;
