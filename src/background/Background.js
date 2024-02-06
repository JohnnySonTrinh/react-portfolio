// Importing necessary modules and assets
import React from "react" // React library for building user interfaces
import "../styles/background.css" // CSS styles for the background
import video from "../assets/bg-universe.mp4" // Video file for the background
import fallbackImage from "../assets/fallback-image.webp" // Fallback image in case the video doesn't load

// Background component
const Background = () => {
  // Rendering the Background component
  return (
    <>
      <div className="shadow-overlay"></div>
      <video
        playsInline
        autoPlay
        muted
        loop
        preload="auto"
        id="bg"
        poster={fallbackImage}
      >
        <source src={video} type="video/mp4"></source>
      </video>
    </>
  )
}
// Exporting the Background component
export default Background
