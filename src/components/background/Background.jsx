import React from "react";
import "../../styles/background.css";
import video from "../../assets/bg-universe.mp4";
import fallbackImage from "../../assets/fallback-image.webp";

// Background component
const Background = () => {
  // Rendering the Background component
  return (
    <>
      <div className="shadow-overlay"></div>
      <video
        playsInline
        autoPlay
        autoplay="autoplay"
        muted
        loop
        preload="auto"
        id="bg"
        poster={fallbackImage}
      >
        <source src={video} type="video/mp4" />
      </video>
    </>
  );
};

// Exporting the Background component
export default Background;
