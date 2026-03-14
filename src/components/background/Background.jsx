import "../../styles/background.css";
import video from "../../assets/background-transition.mp4";
import fallbackImage from "../../assets/fallback-image.webp";
import { useEffect, useRef } from "react";
import { useSiteSettings } from "../../hooks/useSiteSettings";

// Background component
const Background = () => {
  const videoRef = useRef(null);
  const { settings } = useSiteSettings();

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    if (settings.showBackgroundVideo) {
      videoRef.current.play().catch(() => {});
      return;
    }

    videoRef.current.pause();
  }, [settings.showBackgroundVideo]);

  return (
    <>
      <div className="shadow-overlay" aria-hidden="true"></div>
      {!settings.showBackgroundVideo ? (
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
        preload="none"
        id="bg"
        poster={fallbackImage}
        aria-label="Background video"
        className="bg-video"
        style={{ opacity: settings.showBackgroundVideo ? 1 : 0 }}
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  );
};

export default Background;
