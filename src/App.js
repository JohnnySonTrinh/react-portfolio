import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/nav/Nav";
import About from "./pages/about/About";
import Skills from "./skills/Skills";
import Projects from "./projects/Projects";
import Hackathons from "./hackathons/Hackathons";
import Contact from "./contact/Contact";
import "./styles/app.css";
import Background from "./components/background/Background";
import PlayerStats from "./components/playerStats/PlayerStats";
import { PlayerStatsProvider } from "./context/PlayerStatsContext";
import { AvatarProvider } from "./context/AvatarContext";

// Main App component
const App = () => {
  return (
    <PlayerStatsProvider>
      <Router>
        <AvatarProvider>
          <Nav />
          <Background />
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/hackathons" element={<Hackathons />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
          <PlayerStats />
        </AvatarProvider>
      </Router>
    </PlayerStatsProvider>
  );
};

// Exporting the App component
export default App;
