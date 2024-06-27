import React from "react";
import Avatar from "../../components/avatar/Avatar";
import SkillsMenu from "./SkillsMenu";
import { SkillsProvider, useSkills } from "../../context/SkillsContext";

const SkillsContent = () => {
  const { skills, currentCategory, handleCategoryChange } = useSkills();

  return (
    <>
      <Avatar page="skills" />
      <SkillsMenu
        skills={skills}
        currentCategory={currentCategory}
        onCategoryChange={handleCategoryChange}
      />
    </>
  );
};

const Skills = () => {
  return (
    <SkillsProvider>
      <SkillsContent />
    </SkillsProvider>
  );
};

export default Skills;
