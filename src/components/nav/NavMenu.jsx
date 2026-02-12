import { Link, useLocation } from "react-router-dom";

// NavMenu component to render individual navigation items
const NavMenu = ({ to, imgSrc, altText, title, pageTitle }) => {
  const location = useLocation();

  // Determine if the current link is the active link
  const isCurrent = location.pathname === to;
  const linkClass = isCurrent ? "nav-link current" : "nav-link";

  return (
    <Link to={to} className={linkClass} key={to}>
      {!isCurrent && <h1 className="nav-title">{title}</h1>}
      <img src={imgSrc} alt={altText} loading="lazy" />
      {isCurrent && <h1 className="page-title">{pageTitle}</h1>}
      {!isCurrent && <h1 className="hamburger-title">{title}</h1>}
    </Link>
  );
};

export default NavMenu;
