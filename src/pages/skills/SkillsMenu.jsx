import "../../styles/skillsMenu.css";
import frontendIcon from "../../assets/eagle-emblem.png";
import backendIcon from "../../assets/hawk-emblem.png";
import { useSkills } from "../../context/SkillsContext";

// SkillsMenu component
const SkillsMenu = () => {
  // Destructuring state and handlers from useSkills hook
  const {
    skills,
    currentCategory,
    showNote,
    handleMenuItemClick,
    handleCloseNote,
    renderContent,
  } = useSkills();

  // Define the menu items and determine the current icon
  const menuItems = ["FRONT-END", "BACK-END"];
  const currentIcon = currentCategory === 1 ? frontendIcon : backendIcon;

  return (
    <div className="skill-menu">
      {menuItems.map((item, index) => (
        <div
          key={index}
          className={`skill-item ${
            currentCategory === index + 1 ? "activeSkill" : ""
          }`}
          onClick={() => handleMenuItemClick(index + 1)}
        >
          <h2 className="skill-title">{item}</h2>
        </div>
      ))}
      <img className="skill-icon" src={currentIcon} alt="current skill" />
      {showNote && (
        <div className="note">
          <p>
            This does not represent my actual skill level in each stack.
            <button className="close-note" onClick={handleCloseNote}>
              &times;
            </button>
          </p>
        </div>
      )}
      <div className="skill-sub-container">{renderContent(skills)}</div>
    </div>
  );
};

export default SkillsMenu;
