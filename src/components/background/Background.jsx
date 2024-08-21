import "../../styles/background.css";
import video from "../../assets/bg-universe.mp4";
import fallbackImage from "../../assets/fallback-image.webp";

// Background component
const Background = () => {
  return (
    <>
      <div className="shadow-overlay" aria-hidden="true"></div>
      <video
        playsInline
        autoPlay
        muted
        loop
        preload="auto"
        id="bg"
        poster={fallbackImage}
        aria-label="Background video"
        className="scale-in bg-video"
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  );
};

export default Background;
