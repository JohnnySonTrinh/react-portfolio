import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const AvatarContext = createContext();

export const useAvatar = () => useContext(AvatarContext);

export const AvatarProvider = ({ children }) => {
  const [fadeIn, setFadeIn] = useState(false);
  const location = useLocation(); // Access the current location

  useEffect(() => {
    setFadeIn(false); // Reset fade-in state on location change
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 100); // Delay to start animation

    return () => clearTimeout(timer);
  }, [location.pathname]); // Depend on location.pathname to trigger effect on route change

  return (
    <AvatarContext.Provider value={{ fadeIn }}>
      {children}
    </AvatarContext.Provider>
  );
};
