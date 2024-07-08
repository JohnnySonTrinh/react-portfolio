import React, { useState } from "react";
import classNames from "classnames";
import hackathons from "./hackathonsData";
import "../../styles/hackathonsMenu.css";

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
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setActiveHackathon((page - 1) * hackathonsPerPage + 1);
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

  const hackathonItems = hackathons.slice(
    (currentPage - 1) * hackathonsPerPage,
    currentPage * hackathonsPerPage
  );
  const activeHackathonData = hackathons[activeHackathon - 1];
  const totalPages = Math.ceil(hackathons.length / hackathonsPerPage);

  return (
    <div className="hackathon-menu">
      <div className="hackathon-items-container">
        {hackathonItems.map((hackathon, index) => (
          <div
            key={index}
            className={classNames("hackathon-item", {
              activeHackathon:
                activeHackathon ===
                index + 1 + (currentPage - 1) * hackathonsPerPage,
            })}
            onClick={() =>
              handleHackathonClick(
                index + 1 + (currentPage - 1) * hackathonsPerPage
              )
            }
          >
            <h2 className="title">{hackathon.team}</h2>
          </div>
        ))}
      </div>
      <div className="hackathon-sub-container">
        {renderContent(activeHackathonData)}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={classNames("pagination-button", {
                activePage: currentPage === index + 1,
              })}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HackathonsMenu;
