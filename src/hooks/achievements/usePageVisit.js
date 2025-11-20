import { useEffect, useCallback } from "react";
import { useAchievements } from "./useAchievement";

/**
 * Generic hook to track page visits for achievements
 * @param {string} achievementId - The achievement ID to update (optional)
 * @param {number} amount - Amount to increment (default: 1)
 */
const usePageVisit = (achievementId = "visit_all_pages", amount = 1) => {
  const { updateProgress } = useAchievements();

  // Memoize the page visit tracking function
  const trackPageVisit = useCallback(() => {
    updateProgress(achievementId, amount);
  }, [updateProgress, achievementId, amount]);

  useEffect(() => {
    // Update the specified achievement when page loads
    trackPageVisit();
  }, [trackPageVisit]);

  return { updateProgress };
};

export default usePageVisit;
