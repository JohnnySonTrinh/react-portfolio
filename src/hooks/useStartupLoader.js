import { useEffect, useMemo, useRef, useState } from "react";
import { useSiteSettings } from "./useSiteSettings";
import { startupLoaderConfig } from "../data/startupLoaderConfig";

const STARTUP_INTERVAL_MS = 50;
const MINIMUM_DURATION_MS = startupLoaderConfig.timing.durationSeconds * 1000;
const MAX_WAIT_MS = startupLoaderConfig.timing.maxWaitSeconds * 1000;

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

const getTimedProgress = (elapsedMs) => {
  const progress = Math.floor(
    (elapsedMs / MINIMUM_DURATION_MS) *
      startupLoaderConfig.timing.readinessProgressCap
  );

  return Math.min(startupLoaderConfig.timing.readinessProgressCap, progress);
};

const useStartupLoader = ({ isReady = true } = {}) => {
  const { settings } = useSiteSettings();
  const isReadyRef = useRef(isReady);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [statusLabels] = useState(() =>
    shuffleLabels(startupLoaderConfig.text.statusLabels)
  );

  useEffect(() => {
    isReadyRef.current = isReady;
  }, [isReady]);

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

    let elapsedMs = 0;

    const progressInterval = window.setInterval(() => {
      elapsedMs += STARTUP_INTERVAL_MS;

      setProgress((currentProgress) => {
        const hasMinimumDurationElapsed = elapsedMs >= MINIMUM_DURATION_MS;
        const hasMaxWaitElapsed = elapsedMs >= MAX_WAIT_MS;
        const canComplete =
          hasMinimumDurationElapsed && (isReadyRef.current || hasMaxWaitElapsed);

        if (canComplete) {
          setIsComplete(true);
          window.clearInterval(progressInterval);
          return 100;
        }

        return Math.max(currentProgress, getTimedProgress(elapsedMs));
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
