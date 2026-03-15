import { useAchievements } from "../../hooks/achievements/useAchievement";
import useEmailGate from "../../hooks/useEmailGate";
import { useSiteSettings } from "../../hooks/useSiteSettings";

const settingItems = [
  {
    key: "showBackgroundVideo",
    title: "Background Video",
    description: "Turn the animated background video on or off.",
  },
  {
    key: "showParticles",
    title: "Particle Effects",
    description: "Show or hide the floating particle canvas overlay.",
  },
  {
    key: "enableUiMotion",
    title: "Interface Motion",
    description: "Pause breathing, fade, and hover animations across the UI.",
  },
  {
    key: "showAchievementsPanel",
    title: "Achievements Panel",
    description: "Show or hide the floating achievement tracker panel.",
  },
];

const SettingsMenu = () => {
  const { settings, updateSetting, resetSettings } = useSiteSettings();
  const { resetAll } = useAchievements();
  const { emailSubmitted, email, resetEmailGate } = useEmailGate();

  return (
    <div className="settings-menu fade-in">
      <div className="settings-card">
        <header className="settings-header">
          <h2>Control Room</h2>
          <p>Adjust the ambient effects and portfolio helpers without leaving the site.</p>
        </header>

        <section className="settings-section" aria-label="Display settings">
          {settingItems.map((item) => {
            const isEnabled = settings[item.key];

            return (
              <div key={item.key} className="settings-row">
                <div className="settings-copy">
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
                <button
                  type="button"
                  className={`settings-toggle ${isEnabled ? "enabled" : ""}`}
                  onClick={() => updateSetting(item.key, !isEnabled)}
                  aria-pressed={isEnabled}
                  aria-label={`${isEnabled ? "Disable" : "Enable"} ${item.title}`}
                >
                  <span>{isEnabled ? "ON" : "OFF"}</span>
                </button>
              </div>
            );
          })}
        </section>

        <section className="settings-section action-section" aria-label="Reset settings">
          {emailSubmitted ? (
            <div className="settings-row">
              <div className="settings-copy">
                <h3>Chat Assistant Email</h3>
                <p>
                  Saved as {email}. Clear it here if you want to enter a different email
                  next time you open the assistant.
                </p>
              </div>
              <button
                type="button"
                className="settings-action"
                onClick={resetEmailGate}
                aria-label="Change saved chatbot email"
              >
                CHANGE
              </button>
            </div>
          ) : null}

          <div className="settings-row">
            <div className="settings-copy">
              <h3>Reset Achievements</h3>
              <p>Clear all achievement progress and start the portfolio run again from zero.</p>
            </div>
            <button
              type="button"
              className="settings-action danger"
              onClick={resetAll}
            >
              RESET
            </button>
          </div>

          <div className="settings-row">
            <div className="settings-copy">
              <h3>Restore Defaults</h3>
              <p>Return all visual settings to the original portfolio experience.</p>
            </div>
            <button
              type="button"
              className="settings-action"
              onClick={resetSettings}
            >
              DEFAULT
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SettingsMenu;
