import PropTypes from "prop-types";
import avatarImage from "../../assets/avatar-image.webp";
import "../../styles/avatar.css";
import { useAvatar } from "../../context/AvatarContext";

const Avatar = ({ page }) => {
  const { fadeIn } = useAvatar();

  // Constructing class names based on the page prop
  const avatarClass = `avatar ${page} ${fadeIn ? "fade-in" : ""}`;
  const spanClass = `shadow-overlay-${page}`;

  // Returning the Avatar component
  return (
    <>
      <span className={spanClass}></span>
      <img src={avatarImage} className={avatarClass} alt="avatar" />
    </>
  );
};

// Defining propTypes for the Avatar component
Avatar.propTypes = {
  page: PropTypes.string.isRequired,
};

export default Avatar;
