import React, { useState } from "react";
import classNames from "classnames";
import hackathons from "./hackathonsData";
import "../../styles/hackathonsMenu.css";

// HackathonsMenu component
const HackathonsMenu = () => {
  const [activeHackathon, setActiveHackathon] = useState(1);

  // Event handler for clicking a hackathon item
  const handleHackathonClick = (hackathonIndex) => {
    setActiveHackathon(hackathonIndex);
  };

  // Method for rendering the content of the hackathons
  const renderContent = (hackathon) => {
    if (!hackathon) {
      return null; // Return null if hackathon is undefined
    }

    return (
      <div className={`hackathon-sub-container-${activeHackathon}`}>
        <h3>{hackathon.title}</h3>
        <img src={hackathon.image} alt={hackathon.title}></img>
        <div>{hackathon.description}</div>
        <div className="link-container">
          <a href={hackathon.github} target="_blank" rel="noopener noreferrer">
            GITHUB
          </a>
          <a href={hackathon.demo} target="_blank" rel="noopener noreferrer">
            DEMO
          </a>
        </div>
      </div>
    );
  };

  const hackathonItems = ["DEC 2023", "JAN 2024", "FEB 2024"];
  const activeHackathonData = hackathons[activeHackathon - 1];

  return (
    <div className="hackathon-menu">
      <div className="hackathon-items-container">
        {hackathonItems.map((item, index) => (
          <div
            key={index}
            className={classNames("hackathon-item", {
              activeHackathon: activeHackathon === index + 1,
            })}
            onClick={() => handleHackathonClick(index + 1)}
          >
            <h2 className="title">{item}</h2>
          </div>
        ))}
      </div>
      <div className="hackathon-sub-container">
        {renderContent(activeHackathonData)}
      </div>
    </div>
  );
};

export default HackathonsMenu;
