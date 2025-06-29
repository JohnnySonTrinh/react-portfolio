import { useEffect } from "react";
import Vapi from "@vapi-ai/web";

const VoiceAssistant = () => {
  useEffect(() => {
    const vapi = new Vapi(process.env.REACT_APP_VAPI_PUBLIC_KEY);

    vapi.start(process.env.REACT_APP_VAPI_AGENT_ID);

    vapi.on("call-start", () => console.log("🎙️ Call started"));
    vapi.on("message", (msg) => console.log("Message event:", msg));
    vapi.on("call-end", () => console.log("🏁 Call ended"));

    return () => {
      vapi.stop();
    };
  }, []);

  return (
    <div>
      <h2>Voice Assistant is active—speak now!</h2>
    </div>
  );
};

export default VoiceAssistant;
