import React, { useState, useRef, useEffect } from "react";
import projects from "./testsData";
import "../../styles/test.css";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

// ProjectsMenu component
const ProjectsMenu = () => {
  const [activeProject, setActiveProject] = useState(1);
  const containerRef = useRef(null);
  const projectRefs = useRef([]); // Refs for each project item
  const lastScrollTop = useRef(0); // Tracks the previous scroll position

  // Function to scroll to a specific project and set it as active
  const goToProject = (projectIndex) => {
    if (projectIndex > 0 && projectIndex <= projects.length) {
      setActiveProject(projectIndex);
      projectRefs.current[projectIndex - 1].scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Handle scroll event with restricted boundaries
  const handleScroll = (event) => {
    const container = containerRef.current;
    const scrollTop = container.scrollTop;

    // Prevent default scrolling behavior
    event.preventDefault();

    if (scrollTop > lastScrollTop.current) {
      // Scrolling down
      if (activeProject < projects.length) {
        goToProject(activeProject + 1);
      }
    } else if (scrollTop < lastScrollTop.current) {
      // Scrolling up
      if (activeProject > 1) {
        goToProject(activeProject - 1);
      }
    }

    // Update last scroll position
    lastScrollTop.current = scrollTop;
  };

  // Attach wheel event listener to detect mouse scroll
  useEffect(() => {
    const container = containerRef.current;
    container.addEventListener("wheel", handleScroll, { passive: false }); // Prevents default scroll behavior

    // Clean up on component unmount
    return () => {
      container.removeEventListener("wheel", handleScroll);
    };
  }, [activeProject]); // Depend on activeProject so it updates on change

  return (
    <div className="project-menu">
      <div className="project-items-container fade-in" ref={containerRef} style={{ maxHeight: '80px', overflowY: 'hidden' }}>
        <div className={`arrow-button-container ${activeProject > 1 ? "visible" : ""}`}>
          <FaChevronUp
            className="arrow-button scale-in-out"
            onClick={() => goToProject(activeProject - 1)}
          />
        </div>

        {projects.map((project, index) => (
          <div
            key={index}
            ref={(el) => (projectRefs.current[index] = el)} // Assign ref for each project item
            className={`project-item ${activeProject === index + 1 ? "activeProject" : ""}`}
            onClick={() => goToProject(index + 1)}
          >
            <h2 className="title">{project.title}</h2>
          </div>
        ))}

        <div className={`arrow-button-container ${activeProject < projects.length ? "visible" : ""}`}>
          <FaChevronDown
            className="arrow-button scale-in-out"
            onClick={() => goToProject(activeProject + 1)}
          />
        </div>
      </div>

      <div key={activeProject} className="project-sub-container fade-in">
        {activeProject > 0 && (
          <>
            <h3>{projects[activeProject - 1].title}</h3>
            <div className="image-container">
              <img src={projects[activeProject - 1].image} alt={projects[activeProject - 1].title} />
              <div className="hover-description">
                <h3>Tech Stack</h3>
                <div className="tech-stack">
                  {projects[activeProject - 1].techStack.map((tech, index) => (
                    <div key={index} className="icon-with-title">
                      <i className={`devicon colored ${tech.icon}`}></i>
                      <h3>{tech.title}</h3>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p>{projects[activeProject - 1].description}</p>
            <div className="link-container">
              <a href={projects[activeProject - 1].github} target="_blank" rel="noopener noreferrer">
                GITHUB
              </a>
              <a href={projects[activeProject - 1].live} target="_blank" rel="noopener noreferrer">
                LIVE
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectsMenu;
