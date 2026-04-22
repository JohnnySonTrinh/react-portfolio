// Update this file when you want to tune the startup screen without
// digging through the loader logic or component styling.
export const startupLoaderConfig = {
  text: {
    // Small top line above the main title.
    eyebrow: "SERVICE RECORD: JOHNNY TRINH",
    // This part of the eyebrow is allowed to scramble during the boot sequence.
    scrambleTarget: "JOHNNY TRINH",
    // The target text should be fully readable once progress reaches this value.
    scrambleCompleteAtProgress: 60,
    // Main title in the center of the startup screen.
    title: "INITIALIZING",
    // The loader shuffles this list on each fresh startup run.
    statusLabels: [
      "ESTABLISHING UPLINK",
      "SYNCING ARMOR SYSTEMS",
      "LOADING MISSION DATA",
      "VERIFYING CLEARANCE",
      "ACCESSING SERVICE RECORD",
      "LINKING AI CORE",
    ],
  },
  timing: {
    // Change this if you want a longer intro in seconds.
    durationSeconds: 2.5,
    // Let the startup panel fade out smoothly instead of cutting away.
    fadeDurationMs: 1500,
    // Fast exit used when interface motion is disabled in settings.
    reducedMotionExitMs: 120,
  },
  backgroundReveal: {
    // Start fully black before the fallback image begins to show through.
    startBlackOverlay: 1,
    // Let the image opacity control the final reveal at 100%.
    endBlackOverlay: 0,
    // Keep the image fully hidden at the beginning of the loading sequence.
    startImageOpacity: 0,
    // Show the fallback image at roughly 50% strength when progress reaches 100%.
    endImageOpacity: 0.4,
    // Stronger blur at the start keeps the background subtle behind the loader.
    startBlurPx: 12,
    // End near zero so the background looks mostly clear at 100%.
    endBlurPx: 1,
    // Extra cyan glow strength behind the loader panel.
    maxGlowOpacity: 0.16,
  },
};
