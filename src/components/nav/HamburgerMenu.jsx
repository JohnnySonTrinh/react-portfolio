const HamburgerMenu = ({ isOpen, toggleMenu }) => {
  return (
    <div
      className={`hamburger-menu ${isOpen ? "open" : ""}`}
      onClick={toggleMenu}
    >
      <div className="bar"></div>
      <div className="bar"></div>
      <div className="bar"></div>
    </div>
  );
};

export default HamburgerMenu;
