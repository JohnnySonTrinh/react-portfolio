import Background from "../background/Background";
import ParticleCanvas from "../background/ParticleCanvas";
import Nav from "../nav/Nav";
import PlayerStats from "../playerStats/PlayerStats";
import AchievementsPanel from "../achievement/AchievementsPanel";

const AppShell = ({ children }) => {
  return (
    <>
      <Background />
      <ParticleCanvas />
      <Nav />
      <PlayerStats />
      {children}
      <AchievementsPanel />
    </>
  );
};

export default AppShell;
