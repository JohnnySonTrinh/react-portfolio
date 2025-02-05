import hackathons from "../../data/hackathonsData";
import "../../styles/projects.css";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import useActiveProject from "../../hooks/useActiveProject";
import handleProjectWheel from "../../utils/handleProjectWheel";

// HackathonsMenu component
const HackathonsMenu = () => {
  const hackathonsPerPage = 3;

  // Use custom hook for active project state
  const { activeProject, changeProject, selectProject } = useActiveProject(
    1,
    hackathons.length
  );

  const startIndex = Math.max(0, activeProject - 2);
  const hackathonItems = hackathons.slice(
    startIndex,
    startIndex + hackathonsPerPage
  );
  const activeHackathonData = hackathons[activeProject - 1];

  // Method for rendering the content of the hackathons
  const renderContent = (hackathon) => {
    if (!hackathon) {
      return null;
    }

    return (
      <div className={`project-sub-container-${activeProject} fade-in`}>
        <h3>{hackathon.title}</h3>
        <div className="image-container">
          <img src={hackathon.image} alt={hackathon.title}></img>
          <div className="hover-description">
            {hackathon.description.props.children[1]}
          </div>
        </div>
        <div>{hackathon.description.props.children[0]}</div>
        <div className="link-container">
          <a
            href={hackathon.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${hackathon.title} on GitHub`}
          >
            GITHUB
          </a>
          <a
            href={hackathon.demo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View live demo of ${hackathon.title}`}
          >
            DEMO
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="project-menu fade-in"
    onWheel={(e) => handleProjectWheel(e, changeProject)}
    >
      <div className="project-items-container">
        <div
          className={`arrow-button-container ${
            activeProject > 1 ? "visible" : ""
          }`}
        >
          <FaChevronUp
            className="arrow-button scale-in-out"
            tabIndex={0}
            role="button"
            aria-label="Navigate to previous hackathon"
            onClick={() => changeProject(-1)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                changeProject(-1);
              }
            }}
          />
        </div>
        {hackathonItems.map((hackathon, index) => (
          <div
            key={index}
            className={`project-item ${
              activeProject === index + 1 + startIndex ? "activeProject" : ""
            }`}
            role="button"
            tabIndex={0}
            aria-label={`Select project: ${hackathon.title}`}
            aria-pressed={activeProject === index + 1 + startIndex}
            onClick={() => selectProject(index + 1 + startIndex)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                selectProject(index + 1 + startIndex);
              }
            }}
          >
            <h2 className="title">{hackathon.team}</h2>
          </div>
        ))}
        <div
          className={`arrow-button-container ${
            activeProject < hackathons.length ? "visible" : ""
          }`}
        >
          <FaChevronDown
            className="arrow-button scale-in-out"
            tabIndex={0}
            role="button"
            aria-label="Navigate to next hackathon"
            onClick={() => changeProject(1)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                changeProject(1);
              }
            }}
          />
        </div>
      </div>
      <div key={activeProject}
        className="project-sub-container fade-in"
        aria-live="polite"
        >
        {renderContent(activeHackathonData)}
      </div>
    </div>
  );
};

export default HackathonsMenu;
