import React, { useState } from "react";
import classNames from "classnames";
import hackathons from "./hackathonsData";
import "../../styles/hackathonsMenu.css";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

// HackathonsMenu component
const HackathonsMenu = () => {
  const [activeHackathon, setActiveHackathon] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
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
      return null; // Return null if hackathon is undefined
    }

    return (
      <div className={`hackathon-sub-container-${activeHackathon}`}>
        <h3>{hackathon.title}</h3>
        <div className="image-container">
          <img src={hackathon.image} alt={hackathon.title}></img>
          <div className="hover-description">
            {hackathon.description.props.children[1]}
          </div>
        </div>
        <div>{hackathon.description.props.children[0]}</div>
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

  const startIndex = Math.max(0, activeHackathon - 2);
  const hackathonItems = hackathons.slice(
    startIndex,
    startIndex + hackathonsPerPage
  );
  const activeHackathonData = hackathons[activeHackathon - 1];

  return (
    <div className="hackathon-menu fade-in">
      <div className="hackathon-items-container">
        <div
          className={`pagination-button-container ${
            activeHackathon > 1 ? "visible" : ""
          }`}
        >
          <FaChevronUp
            className="pagination-button scale-in-out"
            onClick={() => handlePageChange(-1)}
          />
        </div>
        {hackathonItems.map((hackathon, index) => (
          <div
            key={index}
            className={classNames("hackathon-item", {
              activeHackathon: activeHackathon === index + 1 + startIndex,
            })}
            onClick={() => handleHackathonClick(index + 1 + startIndex)}
          >
            <h2 className="title">{hackathon.team}</h2>
          </div>
        ))}
        <div
          className={`pagination-button-container ${
            activeHackathon < hackathons.length ? "visible" : ""
          }`}
        >
          <FaChevronDown
            className="pagination-button scale-in-out"
            onClick={() => handlePageChange(1)}
          />
        </div>
      </div>
      <div className="hackathon-sub-container">
        {renderContent(activeHackathonData)}
      </div>
    </div>
  );
};

export default HackathonsMenu;
