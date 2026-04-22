import Background from "../background/Background";
import ParticleCanvas from "../background/ParticleCanvas";
import Nav from "../nav/Nav";
import PlayerStats from "../playerStats/PlayerStats";
import AchievementsPanel from "../achievement/AchievementsPanel";
import StartupLoader from "../loading/StartupLoader";
import useStartupLoader from "../../hooks/useStartupLoader";

const AppShell = ({ children }) => {
  const startupLoader = useStartupLoader();

  // Hold the foreground UI until the loader fully exits so route-level
  // fade-in animations happen after the startup sequence instead of behind it.
  const showForegroundContent = !startupLoader.isVisible;

  return (
    <>
      <Background />
      <ParticleCanvas />
      {showForegroundContent ? (
        <>
          <Nav />
          <PlayerStats />
          {children}
          <AchievementsPanel />
        </>
      ) : null}
      <StartupLoader {...startupLoader} />
    </>
  );
};

export default AppShell;
