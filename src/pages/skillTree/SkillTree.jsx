import React from "react";
import Avatar from "../../components/avatar/Avatar";
import SkillsMenu from "./SkillTreeMenu";
import { SkillTreeProvider, useSkillTree } from "../../context/SkillTreeContext";

const SkillTreeContent = () => {
  const { skills, currentCategory, handleCategoryChange } = useSkillTree();

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

const SkillTree = () => {
  return (
    <SkillTreeProvider>
      <SkillTreeContent />
    </SkillTreeProvider>
  );
};
export default SkillTree;
