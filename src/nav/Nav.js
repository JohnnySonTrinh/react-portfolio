// Importing necessary modules and assets
import React from "react" // React library for building user interfaces
import { Link, useLocation } from "react-router-dom" // React Router DOM for routing
import astronautHelmet from "../assets/astronaut-helmet.png" // Astronaut helmet icon
import deadEye from "../assets/dead-eye.png" // DeadEye icon
import stack from "../assets/stack.png" // Stack icon
import global from "../assets/global.png" // Global icon
import envelope from "../assets/envelope.png" // Envelope icon
import "../styles/nav.css" // CSS styles for the Nav component

// Nav component
export default function Nav() {
  // Using the useLocation hook to get the current location
  const location = useLocation()

  // Function to get the class for the current page
  const getNavPositionClass = () => {
    switch (location.pathname) {
      case "/":
        return "nav-about"
      case "/skills":
        return "nav-skills"
      case "/projects":
        return "nav-projects"
      case "/hackathons":
        return "nav-hackathons"
      case "/contact":
        return "nav-contact"
      default:
        return ""
    }
  }

  // Function to get the title for the current page
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "ABOUT"
      case "/skills":
        return "SKILLS"
      case "/projects":
        return "PROJECTS"
      case "/hackathons":
        return "HACKATHONS"
      case "/contact":
        return "CONTACT"
      default:
        return ""
    }
  }

  // Function to check if the current page is the same as the navClass
  const navPositionClass = getNavPositionClass()
  const pageTitle = getPageTitle()

  // Function to check if the current page is the same as the navClass
  const isCurrentPage = (navClass) => {
    return navClass === navPositionClass
  }

  // Function to render the nav link
  const renderNavLink = (to, imgSrc, altText, navClass) => {
    const isCurrent = isCurrentPage(navClass)
    const linkClass = isCurrent ? "nav-link current" : "nav-link"

    return (
      <Link to={to} className={linkClass}>
        <img src={imgSrc} alt={altText} />
        {isCurrent && <h1 className="page-title">{pageTitle}</h1>}
      </Link>
    )
  }

  // Returning the Nav component
  return (
    <nav className={`nav ${navPositionClass}`}>
      {renderNavLink(
        "/",
        astronautHelmet,
        "astronaut helmet icon",
        "nav-about"
      )}
      {renderNavLink("/skills", deadEye, "deadEye icon", "nav-skills")}
      {renderNavLink("/projects", stack, "stack icon", "nav-projects")}
      {renderNavLink("/hackathons", global, "global icon", "nav-hackathons")}
      {renderNavLink("contact", envelope, "envelope icon", "nav-contact")}
    </nav>
  )
}
