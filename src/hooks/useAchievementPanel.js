import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAchievements } from "./useAchievement";

const useAchievementPanel = () => {
  const navigate = useNavigate();
  const { achievements } = useAchievements();
  const [isMinimized, setIsMinimized] = useState(true);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

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
  };

  return {
    isMinimized,
    unlockedCount,
    sortedAchievements,
    achievements,
    handleGoToAchievements,
    toggleMinimized,
  };
};

export default useAchievementPanel;
