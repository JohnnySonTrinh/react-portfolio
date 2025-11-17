import ProjectsMenu from "./ProjectsMenu";
import useMetaTitle from "../../hooks/useMetaTitle";
import pageTitles from "../../data/pageTitles";
import usePageVisit from "../../hooks/achievements/usePageVisit";

const Projects = () => {
  // Set the meta title for the page
  useMetaTitle(pageTitles.projects);
  
  // Track page visit for achievements
  usePageVisit();

  return (
    <>
      <ProjectsMenu />
    </>
  );
};

export default Projects;
