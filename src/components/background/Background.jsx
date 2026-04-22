import "../../styles/background.css";
import video from "../../assets/bg-universe.mp4";
import fallbackImage from "../../assets/fallback-image.webp";
import useBackgroundMedia from "../../hooks/useBackgroundMedia";

const Background = () => {
  const { videoRef, showBackgroundVideo } = useBackgroundMedia();

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
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  );
};

export default Background;
