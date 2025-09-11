import "../../styles/aboutMenu.css";

const AboutSubheading = ({ title, content, active, onClick, menuItem }) => {
  const subContainerClass = `sub-container-${menuItem}`;

  return (
    <div
      className={`${subContainerClass} ${active ? "active-subheading" : ""}`}
      role="button"
      aria-expanded={active}
      tabIndex="0"
      onKeyPress={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
    >
      <h3 onClick={onClick}>{title}</h3>
      <div key={title} className="p-container fade-in">
        {content}
      </div>
    </div>
  );
};

export default AboutSubheading;
