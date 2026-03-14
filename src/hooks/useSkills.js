import { useState } from "react";
import useProfileData from "./useProfileData";
import { skillCategories } from "../data/profileTransformers";

const useSkills = () => {
  const { skillsByCategory, isLoading, error } = useProfileData();
  const [currentCategory, setCurrentCategory] = useState(1);
  const skills = skillsByCategory[currentCategory] || [];

  const handleMenuItemClick = (category) => {
    if (category < 1 || category > skillCategories.length) {
      return; // Prevent invalid categories
    }
    setCurrentCategory(category);
  };

  const renderContent = (skills) => {
    if (isLoading) {
      return <div>Loading skills...</div>;
    }

    if (error) {
      return <div>Unable to load skills right now.</div>;
    }

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
            {skill.icon ? <i className={`devicon ${skill.icon}`} /> : null}
            <h3>{skill.title}</h3>
          </div>
        ))}
      </div>
    );
  };

  return {
    skills,
    currentCategory,
    isLoading,
    error,
    handleMenuItemClick,
    renderContent,
  };
};

export default useSkills;
