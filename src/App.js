import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/nav/Nav";
import Background from "./components/background/Background";
import ParticleCanvas from "./components/background/ParticleCanvas";
import PlayerStats from "./components/playerStats/PlayerStats";
import AchievementsPanel from "./components/achievement/AchievementsPanel";
import { AchievementsProvider } from "./hooks/achievements/useAchievement";
import About from "./pages/about/About";
import Skills from "./pages/skills/Skills";
import Projects from "./pages/projects/Projects";
import Hackathons from "./pages/hackathons/Hackathons";
import Chatbot from "./pages/chatbot/Chatbot";
import Achievement from "./pages/achievements/Achievement";
import Contact from "./pages/contact/Contact";
import NotFound from "./pages/404page/NotFound";
import "./styles/app.css";
import { SpeedInsights } from "@vercel/speed-insights/react";

const App = () => {
  return (
    <AchievementsProvider>
      <Router>
        <SpeedInsights />
        <Background />
        <ParticleCanvas />
        <Nav />
        <PlayerStats />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/hackathons" element={<Hackathons />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/achievements" element={<Achievement />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <AchievementsPanel />
      </Router>
    </AchievementsProvider>
  );
};

export default App;
