import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Background from "./components/background/Background";
import Nav from "./components/nav/Nav";
import About from "./pages/about/About";
import Skills from "./pages/skills/Skills";
import Projects from "./pages/projects/Projects";
import Hackathons from "./pages/hackathons/Hackathons";
import Contact from "./pages/contact/Contact";
import "./styles/app.css";
import PlayerStats from "./components/playerStats/PlayerStats";
import { PlayerStatsProvider } from "./context/PlayerStatsContext";
import { AvatarProvider } from "./context/AvatarContext";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Main App component
const App = () => {
  return (
    <PlayerStatsProvider>
      <Router>
        <AvatarProvider>
          <Background />
          <Nav />
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/hackathons" element={<Hackathons />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <PlayerStats />
          <SpeedInsights />
        </AvatarProvider>
      </Router>
    </PlayerStatsProvider>
  );
};

// Exporting the App component
export default App;
