import "../../styles/aboutMenu.css";

const AboutMenuItem = ({ title, active, onClick }) => {
  return (
    <div
    className={`item ${active ? 'active' : ''}`}
      onClick={onClick}
      role="menuitem"
      aria-current={active ? "page" : undefined}
      tabIndex="0"
      onKeyPress={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
        }
      }}
    >
      <h2 className="title">{title}</h2>
    </div>
  );
};

export default AboutMenuItem;
