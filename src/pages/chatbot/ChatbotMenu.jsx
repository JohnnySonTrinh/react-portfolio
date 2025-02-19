import { useState, useRef, useEffect } from "react";

const ChatbotMenu = () => {
  // TODO: Step 2 - Implement basic chat input and display messages
  // TODO: Step 3 - Connect OpenAI API for text responses
  // TODO: Step 4 - Add voice input (Web Speech API)
  // TODO: Step 5 - Implement AI voice responses (ElevenLabs API)
  // TODO: Step 6 - Add Three.js avatar for AI Johnny

// Fake chat messages
const [messages, setMessages] = useState([
  { id: 1, sender: "ai", text: "Hello! I'm AI Johnny. Ask me anything!" },
  { id: 2, sender: "user", text: "What technologies do you work with?" },
  { id: 3, sender: "ai", text: "I use React, TypeScript, and Three.js for frontend!" },
  { id: 4, sender: "user", text: "Nice! Do you have experience with AI?" },
  { id: 5, sender: "ai", text: "Yes! I'm currently integrating OpenAI into this chatbot." },
  { id: 6, sender: "user", text: "Cool! What's your favorite coding project so far?" },
  { id: 7, sender: "ai", text: "Probably this one! Making myself smart is a top-tier flex." },
  { id: 8, sender: "user", text: "Fair enough! What's your biggest challenge as an AI?" },
  { id: 9, sender: "ai", text: "Convincing people I'm not just another chatbot. I promise, I have personality!" },
  { id: 10, sender: "user", text: "Okay, prove it. Tell me a joke!" },
  { id: 11, sender: "ai", text: "Why do programmers prefer dark mode? Because light attracts bugs!" },
  { id: 12, sender: "user", text: "Haha, good one! What do you know about game development?" },
  { id: 13, sender: "ai", text: "I know Unity and Unreal Engine are popular, but my skills lean towards Three.js for web-based 3D games." },
  { id: 14, sender: "user", text: "Got any tips for learning Three.js?" },
  { id: 15, sender: "ai", text: "Start with basic geometries, learn about the render loop, and use OrbitControls to make cool interactive scenes!" },
  { id: 16, sender: "user", text: "What's next for you?" },
  { id: 17, sender: "ai", text: "Probably world domination. But for now, let's focus on getting this chatbot fully operational!" },
]);

// State for user input
const [input, setInput] = useState("");

// Reference for auto-scrolling to latest message
const chatEndRef = useRef(null);

// Scroll to the latest message when messages update
useEffect(() => {
  chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
}, [messages]);

// Handle sending a message
const handleSendMessage = () => {
  if (!input.trim()) return;

  const newUserMessage = { id: messages.length + 1, sender: "user", text: input };
  const aiResponse = generateFakeResponse(input);

  setMessages([...messages, newUserMessage, aiResponse]);
  setInput("");
};

// Simulated AI responses (placeholder until OpenAI API is added)
const generateFakeResponse = (userInput) => {
  const responses = {
    "hello": "Hey there! How can I assist you?",
    "technologies": "I work with React, TypeScript, and Three.js!",
    "game development": "I know Unity and Unreal Engine, but I love Three.js for web-based 3D.",
    "dark mode": "Why do programmers prefer dark mode? Because light attracts bugs! 😆",
    "future plans": "Probably world domination... just kidding! I want to integrate real AI soon.",
  };

  const responseText = responses[userInput.toLowerCase()] || "That's interesting! Could you elaborate?";
  return { id: messages.length + 2, sender: "ai", text: responseText };
};

return (
  <div className="chat-menu fade-in">
    <div className="chat-header">🟡 In Progress</div>
    <div className="chat-messages">
      {messages.map((msg) => (
        <div key={msg.id} className={`chat-bubble ${msg.sender}`}>
          {msg.text}
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>
    <div className="chat-input-container">
      <input
        type="text"
        placeholder="Type a message..."
        className="chat-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
      />
      <button className="send-button" onClick={handleSendMessage}>Send</button>
    </div>
  </div>
);
};

export default ChatbotMenu;
