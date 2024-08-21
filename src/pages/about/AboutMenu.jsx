import AboutMenuItem from "./AboutMenuItems";
import AboutSubheading from "./AboutSubheading";
import subheadingsData from "./subheadingsData";
import personalIcon from "../../assets/moebius-triangle.png";
import educationIcon from "../../assets/upgrade.png";
import careerIcon from "../../assets/triple-corn.png";
import { useAbout } from "../../context/AboutContext";

// AboutMenu component
const AboutMenu = () => {
  // Extracting values and functions from the useAbout hook
  const {
    activeMenuItem,
    activeSubheading,
    handleMenuItemClick,
    handleSubheadingClick,
  } = useAbout();

  // Defining menu items and icons based on the active menu item
  const menuItems = ["PERSONAL", "EDUCATION", "CAREER"];
  const activeMenuTitle = menuItems[activeMenuItem - 1];
  const activeMenuIcon =
    activeMenuTitle === "PERSONAL"
      ? personalIcon
      : activeMenuTitle === "EDUCATION"
      ? educationIcon
      : careerIcon;

  // Getting the subheadings data for the active menu item
  const subheadings = subheadingsData[activeMenuItem];

  return (
    <>
      {/* Menu container with fade-in animation */}
      <div className="menu fade-in" role="menu">
        {menuItems.map((item, index) => (
          <AboutMenuItem
            key={index}
            title={item}
            active={activeMenuItem === index + 1}
            onClick={() => handleMenuItemClick(index + 1)}
          />
        ))}
      </div>
      {/* Sub-container with fade-in animation */}
      <div className="sub-container fade-in">
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
