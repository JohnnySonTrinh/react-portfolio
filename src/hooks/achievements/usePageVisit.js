import { useEffect, useCallback } from "react";
import { useAchievements } from "./useAchievement";

/**
 * Hook: increment an achievement when the page is visited.
 *
 * @param {string} achievementId - Achievement ID to update (default: "visit_all_pages").
 * @param {number} amount - Amount to increment (default: 1).
 * @returns {{ updateProgress: Function }} Achievement update API.
 */
const usePageVisit = (achievementId = "visit_all_pages", amount = 1) => {
  const { updateProgress } = useAchievements();

  const trackPageVisit = useCallback(() => {
    updateProgress(achievementId, amount);
  }, [updateProgress, achievementId, amount]);

  useEffect(() => {
    trackPageVisit();
  }, [trackPageVisit]);

  return { updateProgress };
};

export default usePageVisit;
