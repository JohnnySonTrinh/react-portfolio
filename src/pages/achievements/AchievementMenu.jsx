import { useAchievements } from '../../hooks/useAchievement';
import "../../styles/achievementMenu.css";

const AchievementMenu = () => {
  const { achievements, resetAll } = useAchievements();

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all achievements? This action cannot be undone.')) {
      resetAll();
    }
  };

  const unlockedCount = achievements.filter(a => a.unlocked).length;

  // Sort achievements: unlocked first, then by progress
  const sortedAchievements = [...achievements].sort((a, b) => {
    if (a.unlocked && !b.unlocked) return -1;
    if (!a.unlocked && b.unlocked) return 1;
    if (a.unlocked && b.unlocked) return 0;
    return (b.progress / b.target) - (a.progress / a.target);
  });

  return (
    <div className="achievement-page fade-in">
      <h1>Achievements </h1>
      <h2>{unlockedCount} / {achievements.length}</h2>
      <div className="achievements-box">
        {sortedAchievements.map((achievement) => (
          <div 
            key={achievement.id} 
            className={`achievement-item ${achievement.unlocked ? 'unlocked' : ''}`}
          >
            <div className="achievement-header">
              <h3>{achievement.title} {achievement.unlocked ? '✔️' : ''}</h3>
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
        Reset All Achievements
      </button>
    </div>
  );
};

export default AchievementMenu;