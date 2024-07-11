import React from "react";
import "../../styles/playerStats.css";
import Linkedin from "../../assets/linkedin.png";
import Github from "../../assets/github.png";
import { LINKEDIN_URL, GITHUB_URL } from "./playerData";
import { usePlayerStats } from "../../context/PlayerStatsContext";

// PlayerStats component
const PlayerStats = () => {
  // Extracting age and barWidth from the usePlayerStats hook
  const { age, barWidth } = usePlayerStats();

  return (
    // Main section with fade-in animation and role for accessibility
    <section className="fade-in" id="playerStats" role="contentinfo">
      <h1>Johnny Trinh Level {age}</h1>
      <div id="playerStats__lines">
        {/* Dynamic width for the thick line based on barWidth */}
        <span id="playerStats__lines__thick" style={{ width: barWidth }}></span>
        <span id="playerStats__lines__thin"></span>
      </div>
      <h2>Fullstack Developer</h2>
      <div className="icon-container">
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
        >
          <img src={Linkedin} alt="LinkedIn" className="icons" />
        </a>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile"
        >
          <img src={Github} alt="GitHub" className="icons" />
        </a>
      </div>
    </section>
  );
};


export default PlayerStats;
