import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useAvatarFade = () => {
  const [fadeIn, setFadeIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setFadeIn(false); // Reset fade-in state on location change
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 100); // Delay to start animation

    return () => clearTimeout(timer);
  }, [location.pathname]); // Trigger effect on route change

  return { fadeIn };
};

export default useAvatarFade;
