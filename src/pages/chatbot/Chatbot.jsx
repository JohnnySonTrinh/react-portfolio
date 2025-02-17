import ChatbotMenu from "./ChatbotMenu";
import useMetaTitle from "../../hooks/useMetaTitle";
import pageTitles from "../../data/pageTitles";
import "../../styles/chatbot.css";

const Chatbot = () => {
  // Set the meta title for the page
  useMetaTitle(pageTitles.chatbot);

  return (
    <div className="chatbot-container">

      <ChatbotMenu />
    </div>
  );
};

export default Chatbot;
