import { useState, useEffect } from "react";
import { calculateAge, BIRTHDAY } from "../utils/calculateAge";

const usePlayerStats = () => {
  const [age, setAge] = useState(calculateAge(BIRTHDAY));
  const [barWidth, setBarWidth] = useState("0%");
  const [daysPassed, setDaysPassed] = useState(0);
  const [totalDaysInYear, setTotalDaysInYear] = useState(365);
  const [isHovered, setIsHovered] = useState(false);
  const [displayText, setDisplayText] = useState("Fullstack Developer");
  const [displayName, setDisplayName] = useState(
    `Johnny Trinh Level ${calculateAge(BIRTHDAY)}`
  );

  // Helper function to get total days in a year (handles leap years)
  const getTotalDaysInYear = (year) => {
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
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

  // Scrambling effect for both texts
  useEffect(() => {
    if (isHovered) {
      const targetText = `EXP ${daysPassed}/${totalDaysInYear}`;
      const targetName = `Johnny Trinh Level ${age}`;
      const chars = "abcdefghijklnopqrstuvwxyz1234567890"; // Characters to use for scrambling

      let scrambleCount = 0;
      const maxScrambles = 20;

      const scrambleInterval = setInterval(() => {
        if (scrambleCount < maxScrambles) {
          // Scramble the description text
          let scrambledText = "";
          for (let i = 0; i < targetText.length; i++) {
            if (targetText[i] === " " || targetText[i] === "/") {
              scrambledText += targetText[i];
            } else {
              scrambledText += chars[Math.floor(Math.random() * chars.length)];
            }
          }

          // Scramble the name/level text one letter at a time
          let scrambledName = "";
          for (let i = 0; i < targetName.length; i++) {
            if (i < scrambleCount || targetName[i] === " ") {
              scrambledName += targetName[i]; // Keep already revealed letters and spaces
            } else {
              scrambledName += chars[Math.floor(Math.random() * chars.length)];
            }
          }

          setDisplayText(scrambledText);
          setDisplayName(scrambledName);
          scrambleCount++;
        } else {
          // Show the correct texts
          setDisplayText(targetText);
          setDisplayName(targetName);
          clearInterval(scrambleInterval);
        }
      }, 50); // Adjust speed of scrambling here

      return () => clearInterval(scrambleInterval);
    } else {
      // Reset to original texts when not hovered
      setDisplayText("Fullstack Developer");
      setDisplayName(`Johnny Trinh Level ${age}`);
    }
  }, [isHovered, daysPassed, totalDaysInYear, age]);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return {
    age,
    barWidth,
    daysPassed,
    totalDaysInYear,
    isHovered,
    displayText,
    displayName,
    handleMouseEnter,
    handleMouseLeave,
  };
};

export default usePlayerStats;
