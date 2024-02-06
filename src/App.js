// Importing necessary modules and components
import React from "react" // React library for building user interfaces
import { BrowserRouter as Router, Routes, Route } from "react-router-dom" // React Router for routing
import Nav from "./nav/Nav" // Navigation component
import About from "./about/About" // About component
import Skills from "./skills/Skills" // Skills component
import Projects from "./projects/Projects" // Projects component
import Hackathons from "./hackathons/Hackathons" // Hackathons component
import Contact from "./contact/Contact" // Contact component
import "./styles/app.css" // Global styles
import Background from "./background/Background" // Background component
import PlayerStats from "./playerStats/PlayerStats" // PlayerStats component

// Main App component
const App = () => {
  // Rendering the App component
  return (
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
  )
}

// Exporting the App component
export default App
