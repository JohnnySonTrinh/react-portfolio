import { useEffect, useMemo, useState } from "react";
import { useSiteSettings } from "./useSiteSettings";
import { startupLoaderConfig } from "../data/startupLoaderConfig";

// The progress bar moves in 100 tiny steps so the percentage and width
// stay visually locked together.
const STARTUP_INTERVAL_MS =
  (startupLoaderConfig.timing.durationSeconds * 1000) / 100;

const shuffleLabels = (labels) => {
  const shuffledLabels = [...labels];

  for (let index = shuffledLabels.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const currentValue = shuffledLabels[index];

    shuffledLabels[index] = shuffledLabels[randomIndex];
    shuffledLabels[randomIndex] = currentValue;
  }

  return shuffledLabels;
};

const getStatusText = (progress, statusLabels) => {
  if (statusLabels.length === 0) {
    return "";
  }

  const labelIndex = Math.min(
    statusLabels.length - 1,
    Math.floor((progress / 100) * statusLabels.length)
  );

  return statusLabels[labelIndex];
};

const useStartupLoader = () => {
  const { settings } = useSiteSettings();
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [statusLabels] = useState(() =>
    shuffleLabels(startupLoaderConfig.text.statusLabels)
  );

  useEffect(() => {
    if (!settings.enableUiMotion) {
      setProgress(100);
      setIsComplete(true);

      const hideTimeout = window.setTimeout(() => {
        setIsVisible(false);
      }, startupLoaderConfig.timing.reducedMotionExitMs);

      return () => {
        window.clearTimeout(hideTimeout);
      };
    }

    const progressInterval = window.setInterval(() => {
      setProgress((currentProgress) => {
        const nextProgress = Math.min(100, currentProgress + 1);

        if (nextProgress === 100) {
          window.clearInterval(progressInterval);
          setIsComplete(true);
        }

        return nextProgress;
      });
    }, STARTUP_INTERVAL_MS);

    return () => {
      window.clearInterval(progressInterval);
    };
  }, [settings.enableUiMotion]);

  useEffect(() => {
    if (!isComplete) {
      return undefined;
    }

    const hideTimeout = window.setTimeout(() => {
      setIsVisible(false);
    }, settings.enableUiMotion
      ? startupLoaderConfig.timing.fadeDurationMs
      : startupLoaderConfig.timing.reducedMotionExitMs);

    return () => {
      window.clearTimeout(hideTimeout);
    };
  }, [isComplete, settings.enableUiMotion]);

  const statusText = useMemo(
    () => getStatusText(progress, statusLabels),
    [progress, statusLabels]
  );

  return {
    progress,
    isComplete,
    isVisible,
    statusText,
  };
};

export default useStartupLoader;
