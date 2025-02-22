import "../../styles/skillsMenu.css";
import frontendIcon from "../../assets/eagle-emblem.png";
import backendIcon from "../../assets/hawk-emblem.png";
import fullstackIcon from "../../assets/astronaut-helmet.png";
import useSkills from "../../hooks/useSkills";
import handleWheelScroll from "../../utils/handleWheelScroll";

const SkillsMenu = () => {
  const { skills, currentCategory, handleMenuItemClick, renderContent } = useSkills();

  const menuItems = ["Frontend", "Backend", "Fullstack"];
  const currentIcon = currentCategory === 1 ? frontendIcon : currentCategory === 2 ? backendIcon : fullstackIcon;

  // Function to handle wheel event
  const handleWheel = (e) => {
    handleWheelScroll(e, {
      currentIndex: currentCategory,
      setIndex: handleMenuItemClick,
      maxIndex: menuItems.length,
    });
  };

  return (
    <div className="skill-menu">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`skill-item ${
              currentCategory === index + 1 ? "activeCategory" : ""
            }`}
            role="button"
            tabIndex="0"
            onClick={() => handleMenuItemClick(index + 1)}
            onKeyPress={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleMenuItemClick(index + 1); 
              }
            }}
            onWheel={handleWheel}
          >
            <h2 className="skill-title">{item.toUpperCase()}</h2>
          </div>
        ))}
      <img 
        className="skill-icon" 
        src={currentIcon} 
        alt="current skill"
        aria-label={`Current skill category: ${menuItems[currentCategory - 1]}`}
      />
      <div key={currentCategory} className="skill-sub-container fade-in">{renderContent(skills)}</div>
    </div>
  );
};

export default SkillsMenu;
