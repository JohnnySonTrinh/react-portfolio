import { useState } from "react";
import hackathons from "./hackathonsData";
import "../../styles/projects.css";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

// HackathonsMenu component
const HackathonsMenu = () => {
  const [activeHackathon, setActiveHackathon] = useState(1);
  const hackathonsPerPage = 3; // Number of hackathons per page

  // Function to handle the hackathon click
  const handleHackathonClick = (hackathon) => {
    setActiveHackathon(hackathon);
  };

  // Function to handle page change
  const handlePageChange = (direction) => {
    const newHackathon = activeHackathon + direction;
    if (newHackathon > 0 && newHackathon <= hackathons.length) {
      setActiveHackathon(newHackathon);
    }
  };

  // Method for rendering the content of the hackathons
  const renderContent = (hackathon) => {
    if (!hackathon) {
      return null;
    }

    return (
      <div className={`project-sub-container-${activeHackathon} fade-in`}>
        <h3>{hackathon.title}</h3>
        <div className="image-container">
          <img src={hackathon.image} alt={hackathon.title}></img>
          <div className="hover-description">
            {hackathon.description.props.children[1]}
          </div>
        </div>
        <div>{hackathon.description.props.children[0]}</div>
        <div className="link-container">
          <a 
            href={hackathon.github} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={`View ${hackathon.title} on GitHub`}
          >
            GITHUB
          </a>
          <a 
            href={hackathon.demo} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={`View live demo of ${hackathon.title}`}
          >
            DEMO
          </a>
        </div>
      </div>
    );
  };

  const startIndex = Math.max(0, activeHackathon - 2);
  const hackathonItems = hackathons.slice(
    startIndex,
    startIndex + hackathonsPerPage
  );
  const activeHackathonData = hackathons[activeHackathon - 1];

  return (
    <div className="project-menu fade-in">
      <div className="project-items-container">
        <div
          className={`arrow-button-container ${
            activeHackathon > 1 ? "visible" : ""
          }`}
        >
          <FaChevronUp
            className="arrow-button scale-in-out"
            tabIndex={0}
            role="button"
            aria-label="Navigate to previous hackathon"
            onClick={() => handlePageChange(-1)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handlePageChange(-1);
              }
            }}
          />
        </div>
        {hackathonItems.map((hackathon, index) => (
          <div
            key={index}
            className={`project-item ${
              activeHackathon === index + 1 + startIndex
                ? "activeProject"
                : ""
            }`}
            role="button"
            tabIndex={0}
            aria-label={`Select project: ${hackathon.title}`}
            aria-pressed={activeHackathon === index + 1 + startIndex}
            onClick={() => handleHackathonClick(index + 1 + startIndex)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleHackathonClick(index + 1 + startIndex);
              }
            }}
            onWheel={(e) => {
              if (e.deltaY > 0) {
                handlePageChange(1);
              } else if (e.deltaY < 0) {
                handlePageChange(-1);
              }
            }}
          >
            <h2 className="title">{hackathon.team}</h2>
          </div>
        ))}
        <div
          className={`arrow-button-container ${
            activeHackathon < hackathons.length ? "visible" : ""
          }`}
        >
          <FaChevronDown
            className="arrow-button scale-in-out"
            tabIndex={0}
            role="button"
            aria-label="Navigate to next hackathon"
            onClick={() => handlePageChange(1)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handlePageChange(1);
              }
            }}
          />
        </div>
      </div>
      <div key={activeHackathon} className="project-sub-container fade-in">
        {renderContent(activeHackathonData)}
      </div>
    </div>
  );
};

export default HackathonsMenu;
