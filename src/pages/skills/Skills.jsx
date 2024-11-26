import Avatar from "../../components/avatar/Avatar";
import SkillsMenu from "./SkillsMenu";
import useSkills from "../../hooks/useSkills";
import useMetaTitle from "../../hooks/useMetaTitle";
import pageTitles from "../../data/pageTitles";


  

const Skills = () => {
  // Set the meta title for the page
  useMetaTitle(pageTitles.skills);

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
