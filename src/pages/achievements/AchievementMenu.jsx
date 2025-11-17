import { useAchievements } from '../../hooks/achievements/useAchievement';
import { useState } from 'react';
import "../../styles/achievementMenu.css";

const AchievementMenu = () => {
  const { achievements, resetAll } = useAchievements();
  const [showCompletionModal, setShowCompletionModal] = useState(false);

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all achievements? This action cannot be undone.')) {
      resetAll();
      setShowCompletionModal(false); // Close modal if open
    }
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const isAllCompleted = unlockedCount === achievements.length;

  // Sort achievements: unlocked first, then by progress
  const sortedAchievements = [...achievements].sort((a, b) => {
    if (a.unlocked && !b.unlocked) return -1;
    if (!a.unlocked && b.unlocked) return 1;
    if (a.unlocked && b.unlocked) return 0;
    return (b.progress / b.target) - (a.progress / a.target);
  });

  return (
    <div className="achievement-page fade-in">
      {!isAllCompleted ? (
        <>
          <h1>Achievements </h1>
          <h2>{unlockedCount} / {achievements.length}</h2>
        </>
      ) : (
        <div className="completion-reward">
          <button 
            onClick={() => setShowCompletionModal(true)}
            className="completion-btn"
          >
            🏆 Claim Your Reward! 🏆
          </button>
        </div>
      )}
      
      <div className="achievements-box">
        {sortedAchievements.map((achievement) => (
          <div 
            key={achievement.id} 
            className={`achievement-item ${achievement.unlocked ? 'unlocked' : ''}`}
          >
            <div className="achievement-header">
              <h3>{achievement.title} {achievement.unlocked}</h3>
              <p>{achievement.desc}</p>
            </div>
            <div className="achievement-progress">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${Math.min(100, (achievement.progress / achievement.target) * 100)}%` }}
                />
              </div>
              <span className="progress-text">
                {achievement.unlocked 
                  ? "Unlocked!" 
                  : `${achievement.progress}/${achievement.target} ${achievement.unit}`
                }
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <button onClick={handleReset} className="reset-btn">
        Reset
      </button>
      {showCompletionModal && (
        <div className="modal-overlay" onClick={() => setShowCompletionModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <span></span>
              <button 
                className="modal-close"
                onClick={() => setShowCompletionModal(false)}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="reward-section">
                <h3>🎬 Exclusive Content</h3>
                <p>Behind the scenes of how this portfolio was built!</p>
                <a
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="youtube-btn"
                >
                  🎲
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AchievementMenu;