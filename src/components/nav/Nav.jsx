import { useState } from "react";
import navData from "./navData";
import NavMenu from "./NavMenu";
import HamburgerMenu from "./HamburgerMenu";
import "../../styles/nav.css";
import { useLocation } from "react-router-dom";

// Nav component to render the navigation bar
const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Function to get the CSS class for the current page
  const getNavPositionClass = () =>
    navData.find((item) => item.to === location.pathname)?.navClass || "";

  // Function to get the title for the current page
  const getPageTitle = () =>
    navData.find((item) => item.to === location.pathname)?.title || "";

  // Determine the CSS class and page title based on the current route
  const navPositionClass = getNavPositionClass();
  const pageTitle = getPageTitle();

  return (
    <nav
      className={`fade-in nav ${navPositionClass} ${
        menuOpen ? "menu-open" : ""
      }`}
      aria-label="Main Navigation"
    >
      <HamburgerMenu isOpen={menuOpen} toggleMenu={toggleMenu} />
      <div className="nav-links">
        {navData.map((item) => (
          <NavMenu
            key={item.to}
            to={item.to}
            imgSrc={item.imgSrc}
            altText={item.altText}
            navClass={item.navClass}
            title={item.title}
            pageTitle={pageTitle}
          />
        ))}
      </div>
    </nav>
  );
};

export default Nav;
