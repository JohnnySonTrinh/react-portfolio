import Avatar from "../../components/avatar/Avatar";
import SkillsMenu from "./SkillsMenu";
import useSkills from "../../hooks/useSkills";

const Skills = () => {
  const {
    skills,
    currentCategory,
    handleCategoryChange,
  } = useSkills();

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

export default Skills;
