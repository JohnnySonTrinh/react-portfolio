import React, { useState } from "react";
import "../../styles/ShadowOverlay.css";

const ShadowOverlay = () => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  // Toggle the overlay visibility
  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  return (
    <>
      <button onClick={toggleOverlay} className="overlay-toggle-button">
        {isOverlayVisible ? "Hide Overlay" : "Show Overlay"}
      </button>

      {isOverlayVisible && <div className="shadow-overlay"></div>}
    </>
  );
};

export default ShadowOverlay;
