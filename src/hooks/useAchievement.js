import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "achievements_v1";

const defaultAchievements = [
  {
    id: "visit_30s",
    title: "Explorer",
    desc: "Visit site for 30 seconds",
    target: 30,
    progress: 0,
    unlocked: false,
    unit: "s",
  },
  {
    id: "chat_messages",
    title: "Chatter",
    desc: "Send 5 chat messages",
    target: 5,
    progress: 0,
    unlocked: false,
    unit: "msgs",
  },
  {
    id: "visit_all_pages",
    title: "Site Explorer",
    desc: "Visit all pages of the portfolio",
    target: 6,
    progress: 0,
    unlocked: false,
    unit: "pages",
  },
  {
    id: "view_projects",
    title: "Project Viewer",
    desc: "View 3 different projects",
    target: 3,
    progress: 0,
    unlocked: false,
    unit: "projects",
  },
  {
    id: "skills_enthusiast",
    title: "Skills Enthusiast",
    desc: "Visit skills page 3 times",
    target: 3,
    progress: 0,
    unlocked: false,
    unit: "visits",
  },
  {
    id: "social_connector",
    title: "Social Connector",
    desc: "Click on social media links",
    target: 2,
    progress: 0,
    unlocked: false,
    unit: "clicks",
  },
  {
    id: "long_visitor",
    title: "Dedicated Visitor",
    desc: "Stay on site for 5 minutes",
    target: 300,
    progress: 0,
    unlocked: false,
    unit: "s",
  },
  {
    id: "quick_learner",
    title: "Quick Learner",
    desc: "Visit contact page within 30 seconds",
    target: 1,
    progress: 0,
    unlocked: false,
    unit: "visits",
  },
  {
    id: "conversation_starter",
    title: "Conversation Starter",
    desc: "Send 10 messages to chatbot",
    target: 10,
    progress: 0,
    unlocked: false,
    unit: "msgs",
  },
  {
    id: "achievement_hunter",
    title: "Achievement Hunter",
    desc: "Unlock 3 other achievements",
    target: 3,
    progress: 0,
    unlocked: false,
    unit: "achievements",
  },
  {
    id: "portfolio_master",
    title: "Portfolio Master",
    desc: "Unlock all achievements",
    target: 9,
    progress: 0,
    unlocked: false,
    unit: "achievements",
  },
  {
    id: "hackathon_curious",
    title: "Hackathon Curious",
    desc: "Visit hackathons page",
    target: 1,
    progress: 0,
    unlocked: false,
    unit: "visits",
  },
];

const AchievementsContext = createContext();

export const AchievementsProvider = ({ children }) => {
  const [achievements, setAchievements] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        // Merge with defaults to handle new achievements
        const merged = defaultAchievements.map((defaultAch) => {
          const savedAch = saved.find((s) => s.id === defaultAch.id);
          return savedAch || defaultAch;
        });
        return merged;
      }
      return defaultAchievements;
    } catch {
      return defaultAchievements;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(achievements));
  }, [achievements]);

  const updateProgress = (id, amount = 1) => {
    setAchievements((prev) =>
      prev.map((a) => {
        if (a.id !== id || a.unlocked) return a;
        const progress = Math.min(a.target, a.progress + amount);
        return {
          ...a,
          progress,
          unlocked: progress >= a.target ? true : a.unlocked,
        };
      })
    );
  };

  const unlock = (id) => {
    setAchievements((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, progress: a.target, unlocked: true } : a
      )
    );
  };

  const resetAll = () => {
    setAchievements(
      defaultAchievements.map((a) => ({ ...a, progress: 0, unlocked: false }))
    );
  };

  useEffect(() => {
    let seconds = 0;
    const interval = setInterval(() => {
      seconds++;
      updateProgress("visit_30s", 1);
      updateProgress("long_visitor", 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <AchievementsContext.Provider
      value={{ achievements, updateProgress, unlock, resetAll }}
    >
      {children}
    </AchievementsContext.Provider>
  );
};

export const useAchievements = () => useContext(AchievementsContext);
