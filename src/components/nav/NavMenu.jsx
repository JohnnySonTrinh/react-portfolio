import React from "react";
import { Link, useLocation } from "react-router-dom";

// NavMenu component to render individual navigation items
const NavMenu = ({ to, imgSrc, altText, navClass, title, pageTitle }) => {
  const location = useLocation();
  
  // Determine if the current link is the active link
  const isCurrent = location.pathname === to;
  const linkClass = isCurrent ? "nav-link current" : "nav-link";

  return (
    <Link to={to} className={linkClass} key={to}>
      {/* Conditionally render the nav title above the icon if not active */}
      {!isCurrent && <h1 className="nav-title">{title}</h1>}
      {/* Icon for the navigation link */}
      <img src={imgSrc} alt={altText} />
      {/* Conditionally render the page title below the icon if active */}
      {isCurrent && <h1 className="page-title">{pageTitle}</h1>}
    </Link>
  );
};

export default NavMenu;
