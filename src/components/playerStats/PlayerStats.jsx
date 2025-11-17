import Linkedin from "../../assets/linkedin.png";
import Github from "../../assets/github.png";
import usePlayerStats from "../../hooks/usePlayerStats";
import { TooltipWrapper } from "../common";
import "../../styles/playerStats.css";

// PlayerStats component
const PlayerStats = () => {
  // Extracting all needed values and handlers from the usePlayerStats hook
  const { 
    barWidth,  
    isHovered,
    displayText,
    displayName,
    handleMouseEnter,
    handleMouseLeave
  } = usePlayerStats();

  return (
    // Main section with fade-in animation and role for accessibility
    <section className="fade-in" id="playerStats" role="contentinfo">
      <TooltipWrapper title="EXP Progress" position="bottom">
        <div
          className="player-info"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <h1 className={isHovered ? "" : ""}>{displayName}</h1>

          <div id="playerStats__lines">
            <span
              id="playerStats__lines__thick"
              style={{ width: barWidth }}
            ></span>
            <span id="playerStats__lines__thin"></span>
          </div>
          <h2 className={isHovered ? "" : "breath"}>{displayText}</h2>
        </div>
      </TooltipWrapper>
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
