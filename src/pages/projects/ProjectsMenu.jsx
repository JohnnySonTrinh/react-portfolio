import "../../styles/projects.css";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import useActiveProject from "../../hooks/useActiveProject";
import { useAchievements } from "../../hooks/achievements/useAchievement";
import handleProjectWheel from "../../utils/handleProjectWheel";
import useProfileData from "../../hooks/useProfileData";

// ProjectsMenu component
const ProjectsMenu = () => {
  const projectsPerPage = 3; // Number of projects per page
  const { updateProgress } = useAchievements();
  const { projects, isLoading, error } = useProfileData();

  // Use custom hook for active project state
  const { activeProject, changeProject, selectProject } = useActiveProject(
    1,
    projects.length
  );

  // Track viewed projects for achievements
  const handleProjectView = (projectId) => {
    updateProgress("view_projects");
  };

  // Enhanced project selection with achievement tracking
  const handleSelectProject = (projectIndex) => {
    selectProject(projectIndex);
    handleProjectView(projectIndex);
  };

  // Enhanced project navigation with achievement tracking
  const handleChangeProject = (direction) => {
    changeProject(direction);
    const newProjectIndex = activeProject + direction;
    if (newProjectIndex >= 1 && newProjectIndex <= projects.length) {
      handleProjectView(newProjectIndex);
    }
  };

  // Slicing projects to show only the projects for the current page
  const startIndex = Math.max(0, activeProject - 2);
  const projectItems = projects.slice(startIndex, startIndex + projectsPerPage);
  const activeProjectData = projects[activeProject - 1];

  if (isLoading) {
    return <div className="project-menu fade-in"><p>Loading projects...</p></div>;
  }

  if (error) {
    return <div className="project-menu fade-in"><p>Unable to load projects right now.</p></div>;
  }

  if (projects.length === 0) {
    return <div className="project-menu fade-in"><p>No projects available.</p></div>;
  }

  const getProjectLinks = (project) => {
    const links = [];

    if (project.github) {
      links.push({
        href: project.github,
        label: "GITHUB",
        ariaLabel: `View ${project.title} on GitHub`,
      });
    }

    if (project.live) {
      links.push({
        href: project.live,
        label: "LIVE",
        ariaLabel: `View live demo of ${project.title}`,
      });
    }

    return links;
  };

  // Function to render the content
  const renderContent = (project) => {
    if (!project) {
      return null;
    }

    const projectLinks = getProjectLinks(project);

    return (
      <div className={`project-sub-container-${activeProject} fade-in`}>
        <h3>{project.title}</h3>
        <div className="image-container">
          <img src={project.image} alt={project.title} loading="lazy"></img>
          <div className="hover-description">
            <h3>Tech Stack</h3>
            <div className="tech-stack">
              {project.techStack.map((tech, index) => (
                <div key={index} className="icon-with-title">
                  {tech.icon ? <i className={`devicon colored ${tech.icon}`}></i> : null}
                  <h3>{tech.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
        <p>{project.description}</p>
        {projectLinks.length > 0 ? (
          <div className="link-container">
            {projectLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.ariaLabel}
              >
                {link.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div
      className="project-menu"
      onWheel={(e) => handleProjectWheel(e, handleChangeProject)}
    >
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
            onClick={() => handleChangeProject(-1)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleChangeProject(-1);
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
            onClick={() => handleSelectProject(index + 1 + startIndex)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleSelectProject(index + 1 + startIndex);
              }
            }}
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
            onClick={() => handleChangeProject(1)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleChangeProject(1);
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
