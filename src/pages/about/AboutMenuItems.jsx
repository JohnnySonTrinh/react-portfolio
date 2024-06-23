import classNames from "classnames";
import "../../styles/aboutMenu.css";

const AboutMenuItem = ({ title, active, onClick }) => {
  return (
    <div
      className={classNames("item", { active })}
      onClick={onClick}
      role="button"
      aria-pressed={active}
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
