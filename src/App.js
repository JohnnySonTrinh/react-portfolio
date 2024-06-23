import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./nav/Nav";
import About from "./about/About";
import Skills from "./skills/Skills";
import Projects from "./projects/Projects";
import Hackathons from "./hackathons/Hackathons";
import Contact from "./contact/Contact";
import "./styles/app.css";
import Background from "./background/Background";
import PlayerStats from "./components/playerStats/PlayerStats";
import { CurrentUserProvider } from "./context/CurrentUserContext";

// Main App component
const App = () => {
  // Rendering the App component
  return (
    <CurrentUserProvider>
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
    </CurrentUserProvider>
  );
};

// Exporting the App component
export default App;
