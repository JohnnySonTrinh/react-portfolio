import React, { createContext, useContext, useState } from "react";
import skillsData from "../pages/skillTree/skillsData";

// Create the SkillTree context
const SkillTreeContext = createContext();

export const SkillTreeProvider = ({ children }) => {
  const [currentCategory, setCurrentCategory] = useState(1);

  // Ensure that the skills are set with a default value to avoid undefined errors
  const [skills, setSkills] = useState(skillsData[1] || []);

  // Function to handle category changes
  const handleCategoryChange = (category) => {
    setCurrentCategory(category);

    // Debugging: Check what is being assigned to `skills`
    // console.log("Setting skills to: ", skillsData[category]);

    // Ensure `skillsData[category]` is defined before setting it
    setSkills(skillsData[category] || []);
  };

  const handleMenuItemClick = (menuItem) => {
    handleCategoryChange(menuItem);
  };

  const renderContent = (skills) => {
    // Add a fallback in case `skills` is undefined or empty
    if (!skills || skills.length === 0) {
      return <div>No skills available for this category.</div>;
    }

    return (
      <div className={`skills-grid-container-${currentCategory}`}>
        {skills.map((skill, index) => (
          <div key={index} className="skill-icon-container">
            <i className={`devicon ${skill.icon}`} />
            <h3>{skill.title}</h3>
          </div>
        ))}
      </div>
    );
  };

  return (
    <SkillTreeContext.Provider
      value={{
        currentCategory,
        skills,
        handleMenuItemClick,
        renderContent,
        handleCategoryChange,
      }}
    >
      {children}
    </SkillTreeContext.Provider>
  );
};

export const useSkillTree = () => useContext(SkillTreeContext);
