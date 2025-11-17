import { useEffect } from "react";
import { useAchievements } from "./useAchievement";

/**
 * Generic hook to track page visits for achievements
 * @param {string} achievementId - The achievement ID to update (optional)
 * @param {number} amount - Amount to increment (default: 1)
 */
const usePageVisit = (achievementId = "visit_all_pages", amount = 1) => {
  const { updateProgress } = useAchievements();

  useEffect(() => {
    // Update the specified achievement when page loads
    updateProgress(achievementId, amount);
  }, []); // Empty deps - only run once on mount

  return { updateProgress }; // Return updateProgress in case page needs other achievement updates
};

export default usePageVisit;