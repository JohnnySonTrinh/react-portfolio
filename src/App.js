import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./nav/Nav";
import About from "./pages/about/About";
import Skills from "./skills/Skills"; // Placeholder, to be moved later
import Projects from "./projects/Projects"; // Placeholder, to be moved later
import Hackathons from "./hackathons/Hackathons"; // Placeholder, to be moved later
import Contact from "./contact/Contact"; // Placeholder, to be moved later
import "./styles/app.css";
import Background from "./background/Background"; // Placeholder, to be moved later
import PlayerStats from "./components/playerStats/PlayerStats";
import { PlayerStatsProvider } from "./context/PlayerStatsContext";

// Main App component
const App = () => {
  // Rendering the App component
  return (
    <PlayerStatsProvider>
      <Router>
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
      </Router>
    </PlayerStatsProvider>
  );
};

// Exporting the App component
export default App;
