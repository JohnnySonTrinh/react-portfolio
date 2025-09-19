import { useState, useEffect } from "react";
import { calculateAge, BIRTHDAY } from "../utils/calculateAge";

const usePlayerStats = () => {
  const [age, setAge] = useState(calculateAge(BIRTHDAY));
  const [barWidth, setBarWidth] = useState("0%");
  const [daysPassed, setDaysPassed] = useState(0);
  const [totalDaysInYear, setTotalDaysInYear] = useState(365);

  // Helper function to get total days in a year (handles leap years)
  const getTotalDaysInYear = (year) => {
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    return isLeapYear ? 366 : 365;
  };

  useEffect(() => {
    const updateStats = () => {
      const today = new Date();
      const currentYear = today.getFullYear();
      const nextBirthday = new Date(
        currentYear,
        BIRTHDAY.getMonth(),
        BIRTHDAY.getDate()
      );

      // Adjust to next year if today's date is past this year's birthday
      if (today > nextBirthday) {
        nextBirthday.setFullYear(currentYear + 1);
      }

      const daysUntilBirthday = Math.round(
        (nextBirthday - today) / (1000 * 60 * 60 * 24)
      );
      
      // Use the helper function to get total days in current year
      const totalDays = getTotalDaysInYear(currentYear);
      const daysPassed = totalDays - daysUntilBirthday;
      const percentage = (daysPassed / totalDays) * 100;

      if (percentage >= 99) {
        console.log("The progress bar has reached 99% or more!");
      }

      // Update age, bar width, days passed, and total days
      setAge(calculateAge(BIRTHDAY));
      setBarWidth(`${percentage}%`);
      setDaysPassed(daysPassed);
      setTotalDaysInYear(totalDays);
    };

    // Initial calculation and interval to update daily
    updateStats();
    const interval = setInterval(updateStats, 86400000); // Update once per day

    return () => clearInterval(interval);
  }, []);

  return { age, barWidth, daysPassed, totalDaysInYear };
};

export default usePlayerStats;