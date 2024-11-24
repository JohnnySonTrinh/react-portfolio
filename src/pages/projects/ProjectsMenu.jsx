import projects from "../../data/projectsData";
import "../../styles/projects.css";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import useActiveProject from "../../hooks/useActiveProject";
import handleProjectWheel from "../../utils/handleProjectWheel";

// ProjectsMenu component
const ProjectsMenu = () => {
  const projectsPerPage = 3; // Number of projects per page

  // Use custom hook for active project state
  const { activeProject, changeProject, selectProject } = useActiveProject(
    1,
    projects.length
  );

  // Slicing projects to show only the projects for the current page
  const startIndex = Math.max(0, activeProject - 2);
  const projectItems = projects.slice(startIndex, startIndex + projectsPerPage);
  const activeProjectData = projects[activeProject - 1];

  // Function to render the content
  const renderContent = (project) => {
    if (!project) {
      return null;
    }

    return (
      <div className={`project-sub-container-${activeProject} fade-in`}>
        <h3>{project.title}</h3>
        <div className="image-container">
          <img src={project.image} alt={project.title}></img>
          <div className="hover-description">
            <h3>Tech Stack</h3>
            <div className="tech-stack">
              {project.techStack.map((tech, index) => (
                <div key={index} className="icon-with-title">
                  <i className={`devicon colored ${tech.icon}`}></i>
                  <h3>{tech.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p>{project.description}</p>
        <div className="link-container">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${project.title} on GitHub`}
          >
            GITHUB
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View live demo of ${project.title}`}
          >
            LIVE
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="project-menu">
      <div className="project-items-container fade-in">
        <div
          className={`arrow-button-container ${
            activeProject > 1 ? "visible" : ""
          }`}
        >
          <FaChevronUp
            className="arrow-button scale-in-out"
            tabIndex={0}
            role="button"
            aria-label="Navigate to the previous project"
            onClick={() => changeProject(-1)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                changeProject(-1);
              }
            }}
          />
        </div>
        {projectItems.map((project, index) => (
          <div
            key={index}
            className={`project-item ${
              activeProject === index + 1 + startIndex ? "activeProject" : ""
            }`}
            role="button"
            tabIndex="0"
            aria-label={`Select project: ${project.title}`}
            aria-pressed={activeProject === index + 1 + startIndex}
            onClick={() => selectProject(index + 1 + startIndex)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                selectProject(index + 1 + startIndex);
              }
            }}
            onWheel={(e) => handleProjectWheel(e, changeProject)}
          >
            <h2 className="title">{project.title}</h2>
          </div>
        ))}
        <div
          className={`arrow-button-container ${
            activeProject < projects.length ? "visible" : ""
          }`}
        >
          <FaChevronDown
            className="arrow-button scale-in-out"
            tabIndex="0"
            role="button"
            aria-label="Navigate to the next project"
            onClick={() => changeProject(1)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                changeProject(1);
              }
            }}
          />
        </div>
      </div>
      <div
        key={activeProject}
        className="project-sub-container fade-in"
        aria-live="polite"
      >
        {renderContent(activeProjectData)}
      </div>
    </div>
  );
};

export default ProjectsMenu;
