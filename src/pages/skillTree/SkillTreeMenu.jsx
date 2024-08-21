import React from "react";
import "../../styles/skillsMenu.css";
import frontendIcon from "../../assets/eagle-emblem.png";
import backendIcon from "../../assets/hawk-emblem.png";
import fullstackIcon from "../../assets/eagle-emblem.png";
import { useSkillTree } from "../../context/SkillTreeContext";

const SkillTreeMenu = () => {
  const { skills, currentCategory, handleMenuItemClick, renderContent } = useSkillTree();

  const menuItems = ["Frontend", "Backend", "Fullstack"];
  const currentIcon = currentCategory === 1 ? frontendIcon : currentCategory === 2 ? backendIcon : fullstackIcon;

  return (
    <div className="skill-menu">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`skill-item ${
              currentCategory === index + 1 ? "activeCategory" : ""
            }`}
            onClick={() => handleMenuItemClick(index + 1)}
          >
            <h2 className="skill-title">{item.toUpperCase()}</h2>
          </div>
        ))}
      <img className="skill-icon" src={currentIcon} alt="current skill" />

      <div className="skill-sub-container">{renderContent(skills)}</div>
    </div>
  );
};

export default SkillTreeMenu;
