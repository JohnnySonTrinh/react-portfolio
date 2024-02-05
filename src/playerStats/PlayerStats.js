import React from "react"
import "../styles/playerStats.css"
import Linkedin from "../assets/linkedin.png"
import Github from "../assets/github.png"

const PlayerStats = () => {
  return (
    <div id="playerStats">
      <h1>JOHNNY TRINH LEVEL 27</h1>
      <div id="playerStats__lines">
        <span id="playerStats__lines__thick"></span>
        <span id="playerStats__lines__thin"></span>
      </div>
      <h2>Fullstack Developer</h2>
      <div className="icon-container">
        <a
          href="https://www.linkedin.com/in/johnny-trinh-732755123/"
          target="_blank"
        >
          <img src={Linkedin} alt="Linkedin" className="icons" />
        </a>
        <a href="https://github.com/JohnnySonTrinh/" target="_blank">
          <img src={Github} alt="Github" className="icons" />
        </a>
      </div>
    </div>
  )
}

export default PlayerStats
