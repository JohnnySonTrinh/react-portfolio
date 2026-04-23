import PropTypes from "prop-types";
import { useEffect, useMemo, useState } from "react";
import fallbackImage from "../../assets/fallback-image.webp";
import { startupLoaderConfig } from "../../data/startupLoaderConfig";
import "../../styles/startupLoader.css";

const SCRAMBLE_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const getScrambledText = (text, revealProgress) => {
  const clampedRevealProgress = Math.max(0, Math.min(1, revealProgress));
  const revealableCharacterCount = text.replace(/ /g, "").length;
  const revealedCharacterCount = Math.floor(
    revealableCharacterCount * clampedRevealProgress
  );

  let revealedSoFar = 0;

  return text
    .split("")
    .map((character) => {
      if (character === " ") {
        return character;
      }

      if (revealedSoFar < revealedCharacterCount) {
        revealedSoFar += 1;
        return character;
      }

      return SCRAMBLE_CHARACTERS[
        Math.floor(Math.random() * SCRAMBLE_CHARACTERS.length)
      ];
    })
    .join("");
};

const StartupLoader = ({ progress, isComplete, isVisible, statusText }) => {
  const revealProgress = progress / 100;
  const [finalTitleText, setFinalTitleText] = useState(
    startupLoaderConfig.text.title
  );
  const titleText =
    progress >= 100
      ? finalTitleText
      : startupLoaderConfig.text.title;
  const {
    startBlackOverlay,
    endBlackOverlay,
    startImageOpacity,
    endImageOpacity,
    startBlurPx,
    endBlurPx,
    maxGlowOpacity,
  } = startupLoaderConfig.backgroundReveal;

  const blackOverlay =
    startBlackOverlay - (startBlackOverlay - endBlackOverlay) * revealProgress;
  const imageOpacity =
    startImageOpacity + (endImageOpacity - startImageOpacity) * revealProgress;
  const backgroundBlur =
    startBlurPx - (startBlurPx - endBlurPx) * revealProgress;
  const glowOpacity = 0.05 + maxGlowOpacity * revealProgress;
  const scrambledEyebrow = useMemo(() => {
    const { eyebrow, scrambleTarget, scrambleCompleteAtProgress } =
      startupLoaderConfig.text;

    if (!scrambleTarget || !eyebrow.includes(scrambleTarget)) {
      return eyebrow;
    }

    // Mirror the player-stats style scramble, but tie the reveal to
    // load progress so the name is stable before the final quarter.
    const scrambleRevealProgress = progress / scrambleCompleteAtProgress;
    const scrambledTarget = getScrambledText(
      scrambleTarget,
      scrambleRevealProgress
    );

    return eyebrow.replace(scrambleTarget, scrambledTarget);
  }, [progress]);

  useEffect(() => {
    const { finalTitle, title } = startupLoaderConfig.text;
    const { finalTitleScrambleMs } = startupLoaderConfig.timing;

    if (progress < 100) {
      setFinalTitleText(title);
      return undefined;
    }

    if (isComplete || finalTitleScrambleMs <= 0) {
      setFinalTitleText(finalTitle);
      return undefined;
    }

    const startedAt = Date.now();

    // Resolve the final title during the PROFILE READY hold instead of
    // snapping from INITIALIZING to ONLINE.
    const updateFinalTitle = () => {
      const elapsedMs = Date.now() - startedAt;
      const revealProgress = elapsedMs / finalTitleScrambleMs;

      setFinalTitleText(getScrambledText(finalTitle, revealProgress));
    };

    updateFinalTitle();

    const scrambleInterval = window.setInterval(
      updateFinalTitle,
      50
    );

    return () => {
      window.clearInterval(scrambleInterval);
    };
  }, [isComplete, progress]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={`startup-loader ${isComplete ? "startup-loader--complete" : ""}`}
      aria-label="Startup loading screen"
      style={{
        "--startup-black-overlay": blackOverlay.toFixed(3),
        "--startup-image-opacity": imageOpacity.toFixed(3),
        "--startup-background-blur": `${backgroundBlur.toFixed(2)}px`,
        "--startup-glow-opacity": glowOpacity.toFixed(3),
        "--startup-fade-duration": `${startupLoaderConfig.timing.fadeDurationMs}ms`,
      }}
    >
      <div
        className="startup-loader__backdrop"
        aria-hidden="true"
        style={{ backgroundImage: `url(${fallbackImage})` }}
      />
      <div className="startup-loader__panel scanlines" role="status" aria-live="polite">
        <p className="startup-loader__eyebrow glow-cyan">
          {scrambledEyebrow}
        </p>
        <h1 className="startup-loader__title glow-green breath">
          {titleText}
        </h1>
        <p className="startup-loader__status">{statusText}</p>

        <div className="startup-loader__progress-row">
          <div
            className="startup-loader__track"
            role="progressbar"
            aria-label="Portfolio startup progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <span
              className="startup-loader__fill"
              data-testid="startup-loader-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="startup-loader__value">
            {progress}%
          </span>
        </div>
      </div>
    </div>
  );
};

StartupLoader.propTypes = {
  progress: PropTypes.number.isRequired,
  isComplete: PropTypes.bool.isRequired,
  isVisible: PropTypes.bool.isRequired,
  statusText: PropTypes.string.isRequired,
};

export default StartupLoader;
