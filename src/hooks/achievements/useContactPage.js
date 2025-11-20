import { useEffect } from "react";
import { useAchievements } from "./useAchievement";
import usePageVisit from "./usePageVisit";

const useContactPage = () => {
  const { checkQuickLearner } = useAchievements();

  // Track page visit for visit_all_pages achievement
  usePageVisit();

  useEffect(() => {
    // Check for quick learner achievement when contact page loads
    checkQuickLearner();
  }, [checkQuickLearner]);
};

export default useContactPage;
