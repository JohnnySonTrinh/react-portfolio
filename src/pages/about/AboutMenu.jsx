import AboutMenuItem from "./AboutMenuItems";
import AboutSubheading from "./AboutSubheading";
import personalIcon from "../../assets/moebius-triangle.png";
import educationIcon from "../../assets/upgrade.png";
import careerIcon from "../../assets/triple-corn.png";
import useAboutState from "../../hooks/useAbout";
import handleWheelScroll from "../../utils/handleWheelScroll";
import useProfileData from "../../hooks/useProfileData";
import { aboutMenuItems } from "../../data/profileTransformers";

const AboutMenu = () => {
  const { aboutSections, isLoading, error } = useProfileData();
  const totalSubheadings = Object.fromEntries(
    Object.entries(aboutSections).map(([key, items]) => [key, items.length || 1])
  );

  // Destructure custom hook values
  const {
    activeMenuItem,
    activeSubheading,
    handleMenuItemClick,
    handleSubheadingClick,
  } = useAboutState(aboutMenuItems.length, totalSubheadings);

  // Define menu items and active menu title/icon
  const activeMenuTitle = aboutMenuItems[activeMenuItem - 1];
  const activeMenuIcon =
    activeMenuTitle === "PERSONAL"
      ? personalIcon
      : activeMenuTitle === "EDUCATION"
      ? educationIcon
      : careerIcon;

  // Get subheadings data for the active menu item
  const subheadings = aboutSections[activeMenuItem] || [];

  // Function to handle wheel event
  const handleWheel = (e, type) => {
    if (type === "menu") {
      handleWheelScroll(e, {
        currentIndex: activeMenuItem,
        setIndex: handleMenuItemClick,
        maxIndex: aboutMenuItems.length,
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
        {aboutMenuItems.map((item, index) => (
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
          <img src={activeMenuIcon} alt={activeMenuTitle} loading="lazy" className="icon" />
          <h3>{activeMenuTitle}</h3>
        </div>
        {isLoading ? <p>Loading profile...</p> : null}
        {error ? <p>Unable to load profile details right now.</p> : null}
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
