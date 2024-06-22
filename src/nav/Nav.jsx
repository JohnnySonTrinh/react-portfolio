import React from "react";
import { Link, useLocation } from "react-router-dom";
import astronautHelmet from "../assets/astronaut-helmet.png";
import deadEye from "../assets/dead-eye.png";
import stack from "../assets/stack.png";
import global from "../assets/global.png";
import envelope from "../assets/envelope.png";
import "../styles/nav.css";

// Nav component
export default function Nav() {
  // Using the useLocation hook to get the current location
  const location = useLocation();

  // Function to get the class for the current page
  const getNavPositionClass = () => {
    switch (location.pathname) {
      case "/":
        return "nav-about";
      case "/skills":
        return "nav-skills";
      case "/projects":
        return "nav-projects";
      case "/hackathons":
        return "nav-hackathons";
      case "/contact":
        return "nav-contact";
      default:
        return "";
    }
  };

  // Function to get the title for the current page
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "ABOUT";
      case "/skills":
        return "SKILLS";
      case "/projects":
        return "PROJECTS";
      case "/hackathons":
        return "HACKATHONS";
      case "/contact":
        return "CONTACT";
      default:
        return "";
    }
  };

  const navPositionClass = getNavPositionClass();
  const pageTitle = getPageTitle();

  // Function to render the nav link
  const renderNavLink = (to, imgSrc, altText, navClass, title) => {
    const isCurrent = location.pathname === to;
    const linkClass = isCurrent ? "nav-link current" : "nav-link";

    return (
      <Link to={to} className={linkClass}>
        {!isCurrent && <h1 className="nav-title">{title}</h1>}
        <img src={imgSrc} alt={altText} />
        {isCurrent && <h1 className="page-title">{pageTitle}</h1>}
      </Link>
    );
  };

  // Returning the Nav component
  return (
    <nav className={`nav ${navPositionClass}`}>
      {renderNavLink(
        "/",
        astronautHelmet,
        "astronaut helmet icon",
        "nav-about",
        "ABOUT"
      )}
      {renderNavLink(
        "/skills",
        deadEye,
        "deadEye icon",
        "nav-skills",
        "SKILLS"
      )}
      {renderNavLink(
        "/projects",
        stack,
        "stack icon",
        "nav-projects",
        "PROJECTS"
      )}
      {renderNavLink(
        "/hackathons",
        global,
        "global icon",
        "nav-hackathons",
        "HACKATHONS"
      )}
      {renderNavLink(
        "/contact",
        envelope,
        "envelope icon",
        "nav-contact",
        "CONTACT"
      )}
    </nav>
  );
}
