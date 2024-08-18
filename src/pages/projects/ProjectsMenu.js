import React, { useState } from "react";
import classNames from "classnames";
import projects from "./projectsData";
import "../../styles/projectsMenu.css";
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
      return null; // Return null if project is undefined
    }

    return (
      <div className={`project-sub-container-${activeProject} fade-in`}>
        <h3>{project.title}</h3>
        <div className="image-container">
          <img src={project.image} alt={project.title}></img>
          <div className="hover-description">
            {project.description.props.children[1]}
          </div>
        </div>
        <div>{project.description.props.children[0]}</div>
        <div className="link-container">
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            GITHUB
          </a>
          <a href={project.live} target="_blank" rel="noopener noreferrer">
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
    <div className="project-menu fade-in">
      <div className="project-items-container">
        <div
          className={`pagination-button-container ${
            activeProject > 1 ? "visible" : ""
          }`}
        >
          <FaChevronUp
            className="pagination-button scale-in-out"
            onClick={() => handlePageChange(-1)}
          />
        </div>
        {projectItems.map((project, index) => (
          <div
            key={index}
            className={classNames("project-item", {
              activeProject: activeProject === index + 1 + startIndex,
            })}
            onClick={() => handleProjectClick(index + 1 + startIndex)}
          >
            <h2 className="title">{project.title}</h2>
          </div>
        ))}
        <div
          className={`pagination-button-container ${
            activeProject < projects.length ? "visible" : ""
          }`}
        >
          <FaChevronDown
            className="pagination-button scale-in-out"
            onClick={() => handlePageChange(1)}
          />
        </div>
      </div>
      <div key={activeProject} className="project-sub-container fade-in">
        {renderContent(activeProjectData)}
      </div>
    </div>
  );
};

export default ProjectsMenu;
