import React, { useState } from "react";
import classNames from "classnames";
import projects from "./projectsData";
import "../../styles/projectsMenu.css";

// ProjectsMenu component
const ProjectsMenu = () => {
  const [activeProject, setActiveProject] = useState(1);

  // Function to handle the project click
  const handleProjectClick = (project) => {
    setActiveProject(project);
  };

  // Function to render the content
  const renderContent = (project) => {
    if (!project) {
      return null; // Return null if project is undefined
    }

    return (
      <div className={`project-sub-container-${activeProject}`}>
        <h3>{project.title}</h3>
        <img src={project.image} alt={project.title}></img>
        <div>{project.description}</div>
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

  const projectItems = ["PROJECT ONE", "PROJECT TWO", "PROJECT THREE"];
  const activeProjectData = projects[activeProject - 1];

  return (
    <div className="project-menu">
      <div className="project-items-container">
        {projectItems.map((item, index) => (
          <div
            key={index}
            className={classNames("project-item", {
              activeProject: activeProject === index + 1,
            })}
            onClick={() => handleProjectClick(index + 1)}
          >
            <h2 className="title">{item}</h2>
          </div>
        ))}
      </div>
      <div className="project-sub-container">
        {renderContent(activeProjectData)}
      </div>
    </div>
  );
};

export default ProjectsMenu;
