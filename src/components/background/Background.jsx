import { useEffect } from "react";
import PropTypes from "prop-types";
import "../../styles/background.css";
import video from "../../assets/background-transition.mp4";
import fallbackImage from "../../assets/fallback-image.webp";
import useBackgroundMedia from "../../hooks/useBackgroundMedia";

const Background = ({ onReady }) => {
  const { videoRef, showBackgroundVideo } = useBackgroundMedia();

  useEffect(() => {
    if (!showBackgroundVideo) {
      onReady();
    }
  }, [onReady, showBackgroundVideo]);

  const handleVideoReady = () => {
    onReady();
  };

  return (
    <>
      <div className="shadow-overlay" aria-hidden="true"></div>
      {!showBackgroundVideo ? (
        <div
          className="bg-fallback-image"
          aria-hidden="true"
          style={{ backgroundImage: `url(${fallbackImage})` }}
        ></div>
      ) : null}
      <video
        ref={videoRef}
        playsInline
        autoPlay
        muted
        loop
        preload={showBackgroundVideo ? "auto" : "none"}
        id="bg"
        poster={fallbackImage}
        aria-label="Background video"
        className="bg-video"
        style={{ opacity: showBackgroundVideo ? 1 : 0 }}
        onLoadedData={handleVideoReady}
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  );
};

Background.propTypes = {
  onReady: PropTypes.func,
};

Background.defaultProps = {
  onReady: () => {},
};

export default Background;
