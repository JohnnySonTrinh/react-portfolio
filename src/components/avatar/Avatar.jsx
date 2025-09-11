import PropTypes from "prop-types";
import avatarImage from "../../assets/avatar-image.webp";
import "../../styles/avatar.css";
import useAvatar from "../../hooks/useAvatar";

const Avatar = ({ page }) => {
  const { fadeIn } = useAvatar();

  // Constructing class names based on the page prop
  const avatarClass = `avatar ${page} ${fadeIn ? "fade-in" : ""}`;

  // Returning the Avatar component
  return (
    <>
      <img
        src={avatarImage}
        className={avatarClass}
        alt="Johnny Trinh - Fullsatck developer avatar"
      />
    </>
  );
};

// Defining propTypes for the Avatar component
Avatar.propTypes = {
  page: PropTypes.string.isRequired,
};

export default Avatar;
