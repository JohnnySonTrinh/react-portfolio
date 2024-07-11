import React from "react";
import classNames from "classnames";
import "../../styles/skillsMenu.css";
import frontendIcon from "../../assets/eagle-emblem.png";
import backendIcon from "../../assets/hawk-emblem.png";
import { useSkills } from "../../context/SkillsContext";

// SkillsMenu component
const SkillsMenu = () => {
  // Destructuring state and handlers from useSkills hook
  const {
    skills,
    currentCategory,
    showNote,
    handleMenuItemClick,
    handleCloseNote,
    renderContent,
  } = useSkills();

  // Define the menu items and determine the current icon
  const menuItems = ["FRONT-END", "BACK-END"];
  const currentIcon = currentCategory === 1 ? frontendIcon : backendIcon;

  return (
    <div className="skill-menu">
      {/* Render the menu items */}
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={classNames("skill-item", {
            activeSkill: currentCategory === index + 1,
          })}
          onClick={() => handleMenuItemClick(index + 1)}
        >
          <h2 className="skill-title">{item}</h2>
        </div>
      ))}
      {/* Render the current icon */}
      <img className="skill-icon" src={currentIcon} alt="current skill" />
      {/* Render the note if showNote is true */}
      {showNote && (
        <div className="note">
          <p>
            This does not represent my actual skill level in each stack.
            <button className="close-note" onClick={handleCloseNote}>
              &times;
            </button>
          </p>
        </div>
      )}
      {/* Render the content for the skills */}
      <div className="skill-sub-container">{renderContent(skills)}</div>
    </div>
  );
};

export default SkillsMenu;
