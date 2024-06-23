import React, { createContext, useContext, useState, useEffect } from "react";
import { calculateAge, BIRTHDAY } from "../components/playerStats/playerData";

const CurrentUserContext = createContext();

export const useCurrentUser = () => {
  return useContext(CurrentUserContext);
};

export const CurrentUserProvider = ({ children }) => {
  const [age, setAge] = useState(calculateAge(BIRTHDAY));
  const [barWidth, setBarWidth] = useState("8.75rem");

  useEffect(() => {
    const interval = setInterval(() => {
      const newAge = calculateAge(BIRTHDAY);
      setAge(newAge);
      // Update the bar width based on the age
      const newBarWidth = `${8.75 + newAge * 0.1}rem`;
      setBarWidth(newBarWidth);
    }, 1000); // Check every second to ensure it updates real-time (optional)

    return () => clearInterval(interval);
  }, []);

  return (
    <CurrentUserContext.Provider value={{ age, barWidth }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
