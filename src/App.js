import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/nav/Nav";
import Background from "./components/background/Background";
import PlayerStats from "./components/playerStats/PlayerStats";
import About from "./pages/about/About";
import Projects from "./pages/projects/Projects";
import Hackathons from "./pages/hackathons/Hackathons";
import Contact from "./pages/contact/Contact";
import Skills from "./pages/skills/Skills";
import "./styles/app.css";
import { SpeedInsights } from "@vercel/speed-insights/react";

// Main App component
const App = () => {
  return (
    <Router>
      <SpeedInsights />
      <Background />
      <Nav />
      <PlayerStats />
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/hackathons" element={<Hackathons />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

// Exporting the App component
export default App;
