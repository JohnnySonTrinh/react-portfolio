import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAchievements } from "./useAchievement";

const useAchievementPanel = () => {
  const navigate = useNavigate();
  const { achievements } = useAchievements();

  // Panel visibility state
  const [isMinimized, setIsMinimized] = useState(true);
  // Show/hide unlock notification
  const [showUnlockedMessage, setShowUnlockedMessage] = useState(false);
  // Current achievement being displayed
  const [currentDisplayAchievement, setCurrentDisplayAchievement] =
    useState(null);
  // Queue of achievements waiting to be shown
  const [achievementQueue, setAchievementQueue] = useState([]);
  // Track which achievements already shown to user
  const [processedAchievements, setProcessedAchievements] = useState(new Set());
  // Refs for managing timeouts
  const timeoutRef = useRef(null);
  const prevUnlockedCountRef = useRef(null);
  const isProcessingQueueRef = useRef(false);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  // Initialize previous unlock count on first render
  if (prevUnlockedCountRef.current === null) {
    prevUnlockedCountRef.current = unlockedCount;
  }

  // Listen for new achievement unlocks and add to queue for display
  useEffect(() => {
    if (unlockedCount > prevUnlockedCountRef.current) {
      // Get newly unlocked achievements that haven't been shown yet
      const unlockedAchievements = achievements.filter((a) => a.unlocked);
      const newlyUnlocked = unlockedAchievements.filter(
        (achievement) => !processedAchievements.has(achievement.id),
      );

      if (newlyUnlocked.length > 0) {
        // Add to queue to display one at a time
        setAchievementQueue((prev) => {
          const newQueue = [...prev, ...newlyUnlocked];
          return newQueue;
        });

        // Mark as processed so we don't show again
        setProcessedAchievements((prev) => {
          const newSet = new Set(prev);
          newlyUnlocked.forEach((achievement) => newSet.add(achievement.id));
          return newSet;
        });
      }
    }

    prevUnlockedCountRef.current = unlockedCount;
  }, [unlockedCount, achievements, processedAchievements]);

  // Display achievements from queue one at a time
  const processNextAchievement = useCallback(() => {
    setAchievementQueue((prev) => {
      if (prev.length === 0) {
        isProcessingQueueRef.current = false;
        return prev;
      }

      // Mark as processing to prevent overlapping
      isProcessingQueueRef.current = true;
      const nextAchievement = prev[0];

      // Show notification and minimize panel
      setCurrentDisplayAchievement(nextAchievement);
      setIsMinimized(true);
      setShowUnlockedMessage(true);

      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Show for 3 seconds then process next
      timeoutRef.current = setTimeout(() => {
        setShowUnlockedMessage(false);
        setCurrentDisplayAchievement(null);

        // Wait 500ms before next notification
        setTimeout(() => {
          isProcessingQueueRef.current = false;
          setAchievementQueue((currentQueue) => {
            if (currentQueue.length > 0) {
              return [...currentQueue];
            }
            return [];
          });
        }, 500);
      }, 3000);

      // Remove from queue
      return prev.slice(1);
    });
  }, []);

  // Trigger processing when queue has items
  useEffect(() => {
    if (achievementQueue.length > 0 && !isProcessingQueueRef.current) {
      processNextAchievement();
    }
  }, [achievementQueue, processNextAchievement]);

  // Cancel timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Sort unlocked first, then by progress
  const sortedAchievements = [...achievements].sort((a, b) => {
    if (a.unlocked && !b.unlocked) return -1;
    if (!a.unlocked && b.unlocked) return 1;
    if (a.unlocked && b.unlocked) return 0;
    return b.progress / b.target - a.progress / a.target;
  });

  // Get text for panel: trophy or achievement name
  const getDisplayText = () => {
    if (!showUnlockedMessage || !currentDisplayAchievement) {
      return "🏆";
    }
    return `${currentDisplayAchievement.title} Unlocked!`;
  };

  const displayText = getDisplayText();

  // Navigate to achievements page
  const handleGoToAchievements = () => {
    navigate("/achievements");
  };

  // Toggle minimized and clear notifications
  const toggleMinimized = () => {
    setIsMinimized(!isMinimized);

    // Clear queue on manual toggle
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      setShowUnlockedMessage(false);
      setCurrentDisplayAchievement(null);
      setAchievementQueue([]);
      isProcessingQueueRef.current = false;
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
