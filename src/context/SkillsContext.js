import React, { createContext, useContext, useState } from "react";
import skillsData, { shuffleLevels } from "../pages/skills/skillsData";

const SkillsContext = createContext();

export const useSkills = () => useContext(SkillsContext);

export const SkillsProvider = ({ children }) => {
  const [currentCategory, setCurrentCategory] = useState(1);
  const [skills, setSkills] = useState(shuffleLevels(skillsData)[1]);
  const [showNote, setShowNote] = useState(true);

  const handleCategoryChange = (category) => {
    setCurrentCategory(category);
    setSkills(shuffleLevels(skillsData)[category]);
  };

  const handleMenuItemClick = (menuItem) => {
    handleCategoryChange(menuItem);
  };

  const handleCloseNote = () => {
    setShowNote(false);
  };

  const renderContent = (skills) => {
    return skills.map((skill, index) => (
      <div key={index} className={`skill-sub-container-${currentCategory}`}>
        <h3>{skill.title}</h3>
        <div className="level-container">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`level-point ${
                i < skill.level ? "filled" : "unfilled"
              }`}
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
      </div>
    ));
  };

  return (
    <SkillsContext.Provider
      value={{
        currentCategory,
        skills,
        showNote,
        handleMenuItemClick,
        handleCloseNote,
        renderContent,
      }}
    >
      {children}
    </SkillsContext.Provider>
  );
};
