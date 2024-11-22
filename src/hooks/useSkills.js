import { useState } from "react";
import skillsData from "../pages/skills/skillsData";

const useSkills = () => {
  const [currentCategory, setCurrentCategory] = useState(1);
  const [skills, setSkills] = useState(skillsData[1] || []);

  const handleMenuItemClick = (category) => {
    if (category < 1 || category > Object.keys(skillsData).length) {
      return; // Prevent invalid categories
    }
    setCurrentCategory(category);
    setSkills(skillsData[category] || []);
  };

  const renderContent = (skills) => {
    if (!skills || skills.length === 0) {
      return <div>No skills available for this category.</div>;
    }

    return (
      <div className={`skills-grid-container-${currentCategory}`}>
        {skills.map((skill, index) => (
          <div
            key={index}
            className="skill-icon-container"
            role="img"
            aria-label={skill.ariaLabel}
          >
            <i className={`devicon ${skill.icon}`} />
            <h3>{skill.title}</h3>
          </div>
        ))}
      </div>
    );
  };

  return {
    skills,
    currentCategory,
    handleMenuItemClick,
    renderContent,
  };
};

export default useSkills;
