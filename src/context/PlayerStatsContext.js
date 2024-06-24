import React, { createContext, useContext, useState, useEffect } from "react";
import { calculateAge, BIRTHDAY } from "../components/playerStats/playerData";

const PlayerStatsContext = createContext();

export const usePlayerStats = () => {
  return useContext(PlayerStatsContext);
};

export const PlayerStatsProvider = ({ children }) => {
  const [age, setAge] = useState(calculateAge(BIRTHDAY));
  const [barWidth, setBarWidth] = useState("0"); // Start with 0 width for animation

  useEffect(() => {
    const interval = setInterval(() => {
      const newAge = calculateAge(BIRTHDAY);
      setAge(newAge);
      // Update the bar width based on the age
      const newBarWidth = `${8.75 + newAge * 0.1}rem`;
      setBarWidth(newBarWidth);
    });

    return () => clearInterval(interval);
  }, []);

  // Trigger animation on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setBarWidth(`${8.75 + age * 0.1}rem`);
    }, 500); // Delay to start animation

    return () => clearTimeout(timer);
  }, [age]);

  return (
    <PlayerStatsContext.Provider value={{ age, barWidth }}>
      {children}
    </PlayerStatsContext.Provider>
  );
};
