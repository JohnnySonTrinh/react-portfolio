import "../../styles/playerStats.css";
import Linkedin from "../../assets/linkedin.png";
import Github from "../../assets/github.png";
import usePlayerStats from "../../hooks/usePlayerStats";
import { useState, useEffect } from "react";

// PlayerStats component
const PlayerStats = () => {
  // Extracting age, barWidth, daysPassed, and totalDaysInYear from the usePlayerStats hook
  const { age, barWidth, daysPassed, totalDaysInYear } = usePlayerStats();
  const [isHovered, setIsHovered] = useState(false);
  const [displayText, setDisplayText] = useState("Fullstack Developer");
  const [displayName, setDisplayName] = useState(`Johnny Trinh Level ${age}`);

  // Scrambling effect for both texts
  useEffect(() => {
    if (isHovered) {
      const targetText = `EXP ${daysPassed}/${totalDaysInYear}`;
      const targetName = `Johnny Trinh Level ${age}`;
      const chars = "abcdefghijklnopqrstuvwxyz1234567890"; // Characters to use for scrambling
      
      let scrambleCount = 0;
      const maxScrambles = 20;
      
      const scrambleInterval = setInterval(() => {
        if (scrambleCount < maxScrambles) {
          // Scramble the description text
          let scrambledText = "";
          for (let i = 0; i < targetText.length; i++) {
            if (targetText[i] === " " || targetText[i] === "/") {
              scrambledText += targetText[i];
            } else {
              scrambledText += chars[Math.floor(Math.random() * chars.length)];
            }
          }
          
          // Scramble the name/level text one letter at a time
          let scrambledName = "";
          for (let i = 0; i < targetName.length; i++) {
            if (i < scrambleCount || targetName[i] === " ") {
              scrambledName += targetName[i]; // Keep already revealed letters and spaces
            } else {
              scrambledName += chars[Math.floor(Math.random() * chars.length)];
            }
          }
          
          setDisplayText(scrambledText);
          setDisplayName(scrambledName);
          scrambleCount++;
        } else {
          // Show the correct texts
          setDisplayText(targetText);
          setDisplayName(targetName);
          clearInterval(scrambleInterval);
        }
      }, 50); // Adjust speed of scrambling here

      return () => clearInterval(scrambleInterval);
    } else {
      // Reset to original texts when not hovered
      setDisplayText("Fullstack Developer");
      setDisplayName(`Johnny Trinh Level ${age}`);
    }
  }, [isHovered, daysPassed, totalDaysInYear, age]);

  return (
    // Main section with fade-in animation and role for accessibility
    <section className="fade-in" id="playerStats" role="contentinfo">
      <div 
        className="player-info"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h1 className={isHovered ? "" : ""}>{displayName}</h1>
        <div id="playerStats__lines">
          <span id="playerStats__lines__thick" style={{ width: barWidth }}></span>
          <span id="playerStats__lines__thin"></span>
        </div>
        <h2 className={isHovered ? "" : "breath"}>{displayText}</h2>
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