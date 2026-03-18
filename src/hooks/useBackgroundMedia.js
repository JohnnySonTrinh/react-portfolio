import { useEffect, useRef } from "react";
import { useSiteSettings } from "./useSiteSettings";

const useBackgroundMedia = () => {
  const videoRef = useRef(null);
  const { settings } = useSiteSettings();
  const showBackgroundVideo = settings.showBackgroundVideo;

  useEffect(() => {
    if (!videoRef.current) {
      return;
    }

    // Keep playback aligned with the setting so the component only handles rendering.
    if (showBackgroundVideo) {
      videoRef.current.play().catch(() => {});
      return;
    }

    videoRef.current.pause();
  }, [showBackgroundVideo]);

  return {
    videoRef,
    showBackgroundVideo,
  };
};

export default useBackgroundMedia;
