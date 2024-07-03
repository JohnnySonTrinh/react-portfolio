import React, { useState } from "react";
import classNames from "classnames";
import projects from "./projectsData";
import "../../styles/projectsMenu.css";

// ProjectsMenu component
const ProjectsMenu = () => {
  const [activeProject, setActiveProject] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3; // Number of projects per page

  // Function to handle the project click
  const handleProjectClick = (project) => {
    setActiveProject(project);
  };

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setActiveProject((page - 1) * projectsPerPage + 1);
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

  const projectItems = projects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );
  const activeProjectData = projects[activeProject - 1];
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  return (
    <div className="project-menu">
      <div className="project-items-container">
        {projectItems.map((project, index) => (
          <div
            key={index}
            className={classNames("project-item", {
              activeProject:
                activeProject ===
                index + 1 + (currentPage - 1) * projectsPerPage,
            })}
            onClick={() =>
              handleProjectClick(
                index + 1 + (currentPage - 1) * projectsPerPage
              )
            }
          >
            <h2 className="title">{project.title}</h2>
          </div>
        ))}
      </div>
      <div className="project-sub-container">
        {renderContent(activeProjectData)}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={classNames("pagination-button", {
                activePage: currentPage === index + 1,
              })}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsMenu;
