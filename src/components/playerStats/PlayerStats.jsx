import "../../styles/playerStats.css";
import Linkedin from "../../assets/linkedin.png";
import Github from "../../assets/github.png";
import usePlayerStats from "../../hooks/usePlayerStats";
import { useState } from "react";

// PlayerStats component
const PlayerStats = () => {
  // Extracting age, barWidth, and daysPassed from the usePlayerStats hook
  const { age, barWidth, daysPassed } = usePlayerStats();
  const [isHovered, setIsHovered] = useState(false);

  // Helper function to get total days in current year (for display)
  const getTotalDaysInYear = (year = new Date().getFullYear()) => {
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    return isLeapYear ? 366 : 365;
  };

  return (
    // Main section with fade-in animation and role for accessibility
    <section className="fade-in" id="playerStats" role="contentinfo">
      <div 
        className="player-info"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h1>Johnny Trinh Level {age}</h1>
        <div id="playerStats__lines">
          <span id="playerStats__lines__thick" style={{ width: barWidth }}></span>
          <span id="playerStats__lines__thin"></span>
        </div>
        <h2>
          {isHovered ? `EXP ${daysPassed}/${getTotalDaysInYear()}` : "Fullstack Developer"}
        </h2>
      </div>
      <div className="icon-container">
        <a
          href="https://www.linkedin.com/in/johnny-trinh-dev/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn Profile"
        >
          <img src={Linkedin} alt="LinkedIn" className="icons" />
        </a>
        <a
          href="https://github.com/JohnnySonTrinh"
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