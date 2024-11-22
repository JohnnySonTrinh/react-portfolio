import AboutMenuItem from "./AboutMenuItems";
import AboutSubheading from "./AboutSubheading";
import subheadingsData from "./subheadingsData";
import personalIcon from "../../assets/moebius-triangle.png";
import educationIcon from "../../assets/upgrade.png";
import careerIcon from "../../assets/triple-corn.png";
import useAboutState from "../../hooks/useAbout";
import handleWheelScroll from "../../utils/handleWheelScroll";

const AboutMenu = () => {
  // Destructure custom hook values
  const {
    activeMenuItem,
    activeSubheading,
    handleMenuItemClick,
    handleSubheadingClick,
  } = useAboutState();

  // Define menu items and active menu title/icon
  const menuItems = ["PERSONAL", "EDUCATION", "CAREER"];
  const activeMenuTitle = menuItems[activeMenuItem - 1];
  const activeMenuIcon =
    activeMenuTitle === "PERSONAL"
      ? personalIcon
      : activeMenuTitle === "EDUCATION"
      ? educationIcon
      : careerIcon;

  // Get subheadings data for the active menu item
  const subheadings = subheadingsData[activeMenuItem];

  // Function to handle wheel event
  const handleWheel = (e, type) => {
    if (type === "menu") {
      handleWheelScroll(e, {
        currentIndex: activeMenuItem,
        setIndex: handleMenuItemClick,
        maxIndex: menuItems.length,
      });
    } else if (type === "subheading") {
      handleWheelScroll(e, {
        currentIndex: activeSubheading,
        setIndex: handleSubheadingClick,
        maxIndex: subheadings.length,
      });
    }
  };

  return (
    <>
      <div
        className="menu fade-in"
        role="menu"
        onWheel={(e) => handleWheel(e, "menu")}
      >
        {menuItems.map((item, index) => (
          <AboutMenuItem
            key={index}
            title={item}
            active={activeMenuItem === index + 1}
            onClick={() => handleMenuItemClick(index + 1)}
          />
        ))}
      </div>
      <div 
        key={activeMenuItem} 
        className="sub-container fade-in" 
        onWheel={(e) => handleWheel(e, "subheading")}
      >
        <div className="icon-title-container">
          <img src={activeMenuIcon} alt={activeMenuTitle} className="icon" />
          <h3>{activeMenuTitle}</h3>
        </div>
        {subheadings.map((subheading, index) => (
          <AboutSubheading
            key={index}
            title={subheading.title}
            content={subheading.content}
            active={activeSubheading === index + 1}
            onClick={() => handleSubheadingClick(index + 1)}
            menuItem={activeMenuItem}
          />
        ))}
      </div>
    </>
  );
};

export default AboutMenu;
