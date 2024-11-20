import React, { useState } from "react";
import projects from "./projectsData";
import "../../styles/projects.css";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

// ProjectsMenu component
const ProjectsMenu = () => {
  // State for the active project and current page
  const [activeProject, setActiveProject] = useState(1);
  const projectsPerPage = 3; // Number of projects per page

  // Function to handle the project click
  const handleProjectClick = (project) => {
    setActiveProject(project);
  };

  // Function to handle page change
  const handlePageChange = (direction) => {
    const newProject = activeProject + direction;
    if (newProject > 0 && newProject <= projects.length) {
      setActiveProject(newProject);
    }
  };

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

  // Slicing projects to show only the projects for the current page
  const startIndex = Math.max(0, activeProject - 2);
  const projectItems = projects.slice(startIndex, startIndex + projectsPerPage);
  const activeProjectData = projects[activeProject - 1];

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
            onClick={() => handlePageChange(-1)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handlePageChange(-1);
              }
            }}
            onWheel={(e) => {
              if (e.deltaY < 0) {
                // Trigger action for scroll up
                handlePageChange(-1);
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
            onClick={() => handleProjectClick(index + 1 + startIndex)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleProjectClick(index + 1 + startIndex);
              }
            }}
            onWheel={(e) => {
              if (e.deltaY > 0) {
                handlePageChange(1);
              } else if (e.deltaY < 0) {
                handlePageChange(-1);
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
            onClick={() => handlePageChange(1)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handlePageChange(1);
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
