import ChatbotMenu from "./ChatbotMenu"
import useMetaTitle from "../../hooks/useMetaTitle";
import pageTitles from "../../data/pageTitles";


const Chatbot = () => {
  // Set the meta title for the page
  useMetaTitle(pageTitles.chatbot);
  return (
    <>
    <ChatbotMenu />
  </>
  )
}

export default Chatbot