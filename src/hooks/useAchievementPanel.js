import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAchievements } from "./useAchievement";

const useAchievementPanel = () => {
  const navigate = useNavigate();
  const { achievements } = useAchievements();
  const [isMinimized, setIsMinimized] = useState(true);
  const [showUnlockedMessage, setShowUnlockedMessage] = useState(false);
  const [displayText, setDisplayText] = useState("🏆");
  const [isScrambling, setIsScrambling] = useState(false);
  const timeoutRef = useRef(null);
  const prevUnlockedCountRef = useRef(null);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  // Initialize prevUnlockedCountRef
  if (prevUnlockedCountRef.current === null) {
    prevUnlockedCountRef.current = unlockedCount;
  }

  // Check for new unlocks and show message for 5 seconds
  useEffect(() => {
    if (unlockedCount > prevUnlockedCountRef.current) {
      // New achievement unlocked
      setIsMinimized(true);
      setShowUnlockedMessage(true);

      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Hide message after 5 seconds
      timeoutRef.current = setTimeout(() => {
        setShowUnlockedMessage(false);
      }, 5000);
    }

    prevUnlockedCountRef.current = unlockedCount;
  }, [unlockedCount]);

  // Scrambling effect when showUnlockedMessage changes
  useEffect(() => {
    // Get the most recently unlocked achievement
    const getLatestUnlockedTitle = () => {
      const unlockedAchievements = achievements.filter((a) => a.unlocked);
      if (unlockedAchievements.length === 0) return "🏆";

      // Get the latest unlocked achievement (assuming they unlock in order)
      const latest = unlockedAchievements[unlockedAchievements.length - 1];
      return `${latest.title} Unlocked!`;
    };

    if (showUnlockedMessage && !isScrambling) {
      setIsScrambling(true);
      const targetText = getLatestUnlockedTitle();
      const chars = "abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*";

      let scrambleCount = 0;

      const scrambleInterval = setInterval(() => {
        if (scrambleCount < targetText.length) {
          // Scramble the text letter by letter
          let scrambledText = "";
          for (let i = 0; i < targetText.length; i++) {
            if (
              i <= scrambleCount ||
              targetText[i] === " " ||
              targetText[i] === "!"
            ) {
              scrambledText += targetText[i]; // Keep already revealed letters, spaces, and exclamation
            } else {
              scrambledText += chars[Math.floor(Math.random() * chars.length)];
            }
          }

          setDisplayText(scrambledText);
          scrambleCount++;
        } else {
          // Show the correct text and stop scrambling
          setDisplayText(targetText);
          setIsScrambling(false);
          clearInterval(scrambleInterval);
        }
      }, 60); // Speed of scrambling

      return () => {
        clearInterval(scrambleInterval);
        setIsScrambling(false);
      };
    } else if (!showUnlockedMessage) {
      // Reset to trophy when message is hidden
      setDisplayText("");
      setIsScrambling(false);
    }
  }, [showUnlockedMessage, achievements, isScrambling]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const sortedAchievements = [...achievements].sort((a, b) => {
    if (a.unlocked && !b.unlocked) return -1;
    if (!a.unlocked && b.unlocked) return 1;
    if (a.unlocked && b.unlocked) return 0;
    return b.progress / b.target - a.progress / a.target;
  });

  const handleGoToAchievements = () => {
    navigate("/achievements");
  };

  const toggleMinimized = () => {
    setIsMinimized(!isMinimized);

    // Clear message when manually interacting
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      setShowUnlockedMessage(false);
    }
  };

  return {
    isMinimized,
    unlockedCount,
    sortedAchievements,
    achievements,
    handleGoToAchievements,
    toggleMinimized,
    showUnlockedMessage,
    displayText,
  };
};

export default useAchievementPanel;
