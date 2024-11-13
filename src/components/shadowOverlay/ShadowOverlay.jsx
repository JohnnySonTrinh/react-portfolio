import React, { useState } from "react";
import "../../styles/ShadowOverlay.css"; // Import CSS for overlay styling

const ShadowOverlay = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  // Toggle the overlay visibility
  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  return (
    <>
      {/* Button to toggle the overlay */}
      <button onClick={toggleOverlay} className="overlay-toggle-button">
        {isOverlayVisible ? "Hide Overlay" : "Show Overlay"}
      </button>

      {/* Shadow overlay div, visible only when isOverlayVisible is true */}
      {isOverlayVisible && <div className="shadow-overlay"></div>}
    </>
  );
};

export default ShadowOverlay;
