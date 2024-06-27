import React from "react";
import classNames from "classnames";
import "../../styles/skillsMenu.css";
import frontendIcon from "../../assets/eagle-emblem.png";
import backendIcon from "../../assets/hawk-emblem.png";
import { useSkills } from "../../context/SkillsContext";

const SkillsMenu = () => {
  const {
    skills,
    currentCategory,
    showNote,
    handleMenuItemClick,
    handleCloseNote,
    renderContent,
  } = useSkills();

  const menuItems = ["FRONT-END", "BACK-END"];
  const currentIcon = currentCategory === 1 ? frontendIcon : backendIcon;

  return (
    <div className="skill-menu" key={currentCategory}>
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
      <img className="skill-icon" src={currentIcon} alt="current skill" />
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
      <div className="skill-sub-container">{renderContent(skills)}</div>
    </div>
  );
};

export default SkillsMenu;
