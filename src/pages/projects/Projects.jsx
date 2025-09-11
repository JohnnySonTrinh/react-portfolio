import ProjectsMenu from "./ProjectsMenu";
import useMetaTitle from "../../hooks/useMetaTitle";
import pageTitles from "../../data/pageTitles";

const Projects = () => {
  // Set the meta title for the page
  useMetaTitle(pageTitles.projects);

  return (
    <>
      <ProjectsMenu />
    </>
  );
};

export default Projects;
