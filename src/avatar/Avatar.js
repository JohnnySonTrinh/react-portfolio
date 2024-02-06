// Importing required modules and assets
import PropTypes from "prop-types" // Prop-types for typechecking of props
import avatarImage from "../assets/avatar-image.webp" // Importing avatar image
import "../styles/avatar.css" // Importing CSS for the avatar

// Avatar component
const Avatar = ({ page }) => {
  // Constructing class names based on the page prop
  const avatarClass = `avatar ${page}`
  const spanClass = `shadow-overlay-${page}`

  // Returning the Avatar component
  return (
    <>
      <span className={spanClass}></span>
      <img src={avatarImage} className={avatarClass} alt="avatar" />
    </>
  )
}

// Defining propTypes for the Avatar component
Avatar.propTypes = {
  page: PropTypes.string.isRequired, // page prop is required and should be a string
}

// Exporting the Avatar component
export default Avatar
