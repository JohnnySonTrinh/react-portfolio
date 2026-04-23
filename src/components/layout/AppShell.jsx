import { useCallback, useEffect, useMemo, useState } from "react";
import Background from "../background/Background";
import ParticleCanvas from "../background/ParticleCanvas";
import Nav from "../nav/Nav";
import PlayerStats from "../playerStats/PlayerStats";
import AchievementsPanel from "../achievement/AchievementsPanel";
import StartupLoader from "../loading/StartupLoader";
import useStartupLoader from "../../hooks/useStartupLoader";
import fallbackImage from "../../assets/fallback-image.webp";
import { preloadProfileData } from "../../hooks/useProfileData";

const AppShell = ({ children }) => {
  const [profileReady, setProfileReady] = useState(false);
  const [loaderBackdropReady, setLoaderBackdropReady] = useState(false);
  const [backgroundReady, setBackgroundReady] = useState(false);
  const isStartupReady = useMemo(
    () => profileReady && loaderBackdropReady && backgroundReady,
    [backgroundReady, loaderBackdropReady, profileReady]
  );
  const startupLoader = useStartupLoader({ isReady: isStartupReady });
  const handleBackgroundReady = useCallback(() => {
    setBackgroundReady(true);
  }, []);

  useEffect(() => {
    let isMounted = true;

    preloadProfileData()
      .catch(() => {})
      .finally(() => {
        if (isMounted) {
          setProfileReady(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const image = new Image();

    image.onload = () => {
      if (isMounted) {
        setLoaderBackdropReady(true);
      }
    };
    image.onerror = () => {
      if (isMounted) {
        setLoaderBackdropReady(true);
      }
    };
    image.src = fallbackImage;

    return () => {
      isMounted = false;
    };
  }, []);

  // Hold the foreground UI until the loader fully exits so route-level
  // fade-in animations happen after the startup sequence instead of behind it.
  const showForegroundContent = !startupLoader.isVisible;

  return (
    <>
      <Background onReady={handleBackgroundReady} />
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
