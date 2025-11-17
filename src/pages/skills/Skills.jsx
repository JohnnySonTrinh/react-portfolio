import Avatar from "../../components/avatar/Avatar";
import SkillsMenu from "./SkillsMenu";
import useSkills from "../../hooks/useSkills";
import useMetaTitle from "../../hooks/useMetaTitle";
import pageTitles from "../../data/pageTitles";
import usePageVisit from "../../hooks/achievements/usePageVisit";

const Skills = () => {
  // Set the meta title for the page
  useMetaTitle(pageTitles.skills);
  
  // Track page visit for achievements
  usePageVisit(); // For visit_all_pages
  usePageVisit("skills_enthusiast"); // For skills_enthusiast achievement

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
