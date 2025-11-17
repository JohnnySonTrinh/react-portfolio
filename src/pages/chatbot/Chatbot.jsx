import ChatbotMenu from "./ChatbotMenu";
import useMetaTitle from "../../hooks/useMetaTitle";
import pageTitles from "../../data/pageTitles";
import usePageVisit from "../../hooks/achievements/usePageVisit";
import "../../styles/chatbot.css";

const Chatbot = () => {
  // Set the meta title for the page
  useMetaTitle(pageTitles.chatbot);
  
  // Track page visit for achievements
  usePageVisit();

  return (
    <div className="chatbot-container">
      <ChatbotMenu />
    </div>
  );
};

export default Chatbot;
