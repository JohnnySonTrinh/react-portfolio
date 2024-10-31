import { createContext, useContext, useState, useEffect } from "react";
import { calculateAge, BIRTHDAY } from "../components/playerStats/playerData";

const PlayerStatsContext = createContext();

export const usePlayerStats = () => {
  return useContext(PlayerStatsContext);
};

export const PlayerStatsProvider = ({ children }) => {
  const [age, setAge] = useState(calculateAge(BIRTHDAY));
  const [barWidth, setBarWidth] = useState("0%");

  useEffect(() => {
    const updateBarWidth = () => {
      const today = new Date();
      const nextBirthday = new Date(
        today.getFullYear(),
        BIRTHDAY.getMonth(),
        BIRTHDAY.getDate()
      );

      // Adjust to next year if today's date is past this year's birthday
      if (today > nextBirthday) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
      }

      const daysUntilBirthday = Math.round(
        (nextBirthday - today) / (1000 * 60 * 60 * 24)
      );
      const totalDaysInYear = 366; // Consider leap year if necessary
      const percentage =
        ((totalDaysInYear - daysUntilBirthday) / totalDaysInYear) * 100;

      if (percentage >= 99) {
        console.log("The progress bar has reached 99% or more!");
      }
      // Update age and bar width
      setAge(calculateAge(BIRTHDAY));
      setBarWidth(`${percentage}%`);
    };

    // Initial calculation and interval to update daily
    updateBarWidth();
    const interval = setInterval(updateBarWidth, 86400000); // Update once per day (86400000 ms = 24 hours)

    return () => clearInterval(interval);
  }, []);

  return (
    <PlayerStatsContext.Provider value={{ age, barWidth }}>
      {children}
    </PlayerStatsContext.Provider>
  );
};
