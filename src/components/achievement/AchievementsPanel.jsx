import useAchievementPanel from "../../hooks/useAchievementPanel";
import "../../styles/achievementPanel.css";
import { TooltipWrapper } from "../common";

const AchievementsPanel = () => {
  const {
    isMinimized,
    unlockedCount,
    sortedAchievements,
    achievements,
    handleGoToAchievements,
    toggleMinimized,
  } = useAchievementPanel();

  return (
    <aside className={`achievements-panel fade-in ${isMinimized ? 'minimized' : ''}`}>
      <header>
        <div className="header-content">
          <h3>
            {isMinimized ? `🏆 ${unlockedCount} / ${achievements.length}` : `Achievements (${unlockedCount}/${achievements.length})`} 
          </h3>
          <div className="header-buttons">
            {!isMinimized && (
              <TooltipWrapper title="Achievement room" position="bottom">
              <button 
                onClick={handleGoToAchievements}
                className="achievement-link-btn"
                aria-label="Go to achievements page"
              >
                🏆
              </button>
              </TooltipWrapper>
            )}
            <button 
              onClick={toggleMinimized}
              className={`minimize-btn achievement-hamburger ${isMinimized ? '' : 'open'}`}
              aria-label={isMinimized ? "Expand achievements" : "Minimize achievements"}
            >
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </button>
          </div>
        </div>
      </header>
      {!isMinimized && (
        <ul>
          {sortedAchievements.map((a) => (
            <li key={a.id} className={a.unlocked ? "unlocked" : ""}>
              <div className="ach-row">
                <div className="meta">
                  <strong>{a.title} {a.unlocked}</strong>
                  <small>{a.desc}</small>
                </div>
                <div className="progress">
                  <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${Math.min(100, (a.progress / a.target) * 100)}%` }}
                  />
                  </div>
                  <span className="label">
                    {a.unlocked ? "Unlocked!" : `${a.progress}/${a.target} ${a.unit}`}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
};

export default AchievementsPanel;