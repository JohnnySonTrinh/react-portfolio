import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAchievements } from "./useAchievement";

const useAchievementPanel = () => {
  const navigate = useNavigate();
  const { achievements } = useAchievements();
  const [isMinimized, setIsMinimized] = useState(true);
  const [showUnlockedMessage, setShowUnlockedMessage] = useState(false);
  const [currentDisplayAchievement, setCurrentDisplayAchievement] =
    useState(null);
  const [achievementQueue, setAchievementQueue] = useState([]);
  const [processedAchievements, setProcessedAchievements] = useState(new Set());
  const timeoutRef = useRef(null);
  const prevUnlockedCountRef = useRef(null);
  const isProcessingQueueRef = useRef(false);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  // Initialize prevUnlockedCountRef
  if (prevUnlockedCountRef.current === null) {
    prevUnlockedCountRef.current = unlockedCount;
  }

  // Check for new unlocks and add them to queue
  useEffect(() => {
    if (unlockedCount > prevUnlockedCountRef.current) {
      console.log("🎯 Achievement unlock detected!");
      console.log("Previous count:", prevUnlockedCountRef.current);
      console.log("Current count:", unlockedCount);

      // Find truly new achievements (not already processed)
      const unlockedAchievements = achievements.filter((a) => a.unlocked);
      const newlyUnlocked = unlockedAchievements.filter(
        (achievement) => !processedAchievements.has(achievement.id)
      );

      console.log("Newly unlocked count:", newlyUnlocked.length);
      console.log(
        "Newly unlocked achievements:",
        newlyUnlocked.map((a) => a.title)
      );
      console.log("Already processed:", Array.from(processedAchievements));

      if (newlyUnlocked.length > 0) {
        // Add new achievements to queue
        setAchievementQueue((prev) => {
          console.log(
            "Current queue before adding:",
            prev.map((a) => a.title)
          );
          const newQueue = [...prev, ...newlyUnlocked];
          console.log(
            "New queue after adding:",
            newQueue.map((a) => a.title)
          );
          return newQueue;
        });

        // Mark these achievements as processed
        setProcessedAchievements((prev) => {
          const newSet = new Set(prev);
          newlyUnlocked.forEach((achievement) => newSet.add(achievement.id));
          return newSet;
        });
      }
    }

    prevUnlockedCountRef.current = unlockedCount;
  }, [unlockedCount, achievements, processedAchievements]);

  const processNextAchievement = useCallback(() => {
    console.log("🔄 processNextAchievement called");

    setAchievementQueue((prev) => {
      console.log("Current queue length:", prev.length);
      console.log(
        "isProcessingQueueRef.current:",
        isProcessingQueueRef.current
      );

      if (prev.length === 0) {
        console.log("Queue is empty, stopping processing");
        isProcessingQueueRef.current = false;
        return prev;
      }

      console.log("Starting to process achievement");
      isProcessingQueueRef.current = true;
      const nextAchievement = prev[0];

      console.log("Processing achievement:", nextAchievement.title);

      // Display the achievement
      setCurrentDisplayAchievement(nextAchievement);
      setIsMinimized(true);
      setShowUnlockedMessage(true);

      // Clear any existing timeout
      if (timeoutRef.current) {
        console.log("Clearing existing timeout");
        clearTimeout(timeoutRef.current);
      }

      // Hide message after 3 seconds and process next
      timeoutRef.current = setTimeout(() => {
        console.log("Timeout completed for:", nextAchievement.title);
        setShowUnlockedMessage(false);
        setCurrentDisplayAchievement(null);

        // Wait a brief moment before processing next achievement
        setTimeout(() => {
          console.log("Ready to process next achievement");
          isProcessingQueueRef.current = false;
          // Trigger re-evaluation of queue
          setAchievementQueue((currentQueue) => {
            console.log("Queue after timeout, length:", currentQueue.length);
            if (currentQueue.length > 0) {
              console.log("More items in queue, will process next");
              // Return the current queue to trigger useEffect to process next item
              return [...currentQueue]; // Force re-render to trigger useEffect
            }
            console.log("Queue finished, clearing");
            return [];
          });
        }, 500); // 500ms gap between achievements
      }, 3000); // Reduced to 3 seconds for faster queue processing

      // Remove the current achievement from queue
      console.log("Removing current achievement from queue");
      return prev.slice(1);
    });
  }, []);

  // Process achievement queue
  useEffect(() => {
    console.log("📋 Queue useEffect triggered");
    console.log("Queue length:", achievementQueue.length);
    console.log("Is processing:", isProcessingQueueRef.current);

    if (achievementQueue.length > 0 && !isProcessingQueueRef.current) {
      console.log("Starting queue processing...");
      processNextAchievement();
    } else if (achievementQueue.length > 0 && isProcessingQueueRef.current) {
      console.log("Queue has items but already processing");
    } else {
      console.log("Queue is empty or no conditions met");
    }
  }, [achievementQueue, processNextAchievement]);

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

  // Get the display text for current achievement
  const getDisplayText = () => {
    if (!showUnlockedMessage || !currentDisplayAchievement) {
      return "🏆";
    }
    return `${currentDisplayAchievement.title} Unlocked!`;
  };

  const displayText = getDisplayText();

  const handleGoToAchievements = () => {
    navigate("/achievements");
  };

  const toggleMinimized = () => {
    console.log("👆 User toggled panel");
    setIsMinimized(!isMinimized);

    // Clear message and queue when manually interacting
    if (timeoutRef.current) {
      console.log("Clearing timeout and queue due to user interaction");
      clearTimeout(timeoutRef.current);
      setShowUnlockedMessage(false);
      setCurrentDisplayAchievement(null);
      setAchievementQueue([]); // Clear the queue
      isProcessingQueueRef.current = false;
      // Note: We don't clear processedAchievements so already shown achievements won't show again
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
