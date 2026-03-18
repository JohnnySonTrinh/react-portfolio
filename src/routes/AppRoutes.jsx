import { Route, Routes } from "react-router-dom";
import About from "../pages/about/About";
import Skills from "../pages/skills/Skills";
import Projects from "../pages/projects/Projects";
import Hackathons from "../pages/hackathons/Hackathons";
import Chatbot from "../pages/chatbot/Chatbot";
import Achievement from "../pages/achievements/Achievement";
import Contact from "../pages/contact/Contact";
import Settings from "../pages/settings/Settings";
import NotFound from "../pages/404page/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<About />} />
      <Route path="/skills" element={<Skills />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/hackathons" element={<Hackathons />} />
      <Route path="/chatbot" element={<Chatbot />} />
      <Route path="/achievements" element={<Achievement />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
