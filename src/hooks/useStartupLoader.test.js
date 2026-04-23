import { act, renderHook } from "@testing-library/react";
import { startupLoaderConfig } from "../data/startupLoaderConfig";
import { useSiteSettings } from "./useSiteSettings";
import useStartupLoader from "./useStartupLoader";

jest.mock("./useSiteSettings", () => ({
  useSiteSettings: jest.fn(),
}));

describe("useStartupLoader", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    useSiteSettings.mockReturnValue({
      settings: {
        enableUiMotion: true,
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("does not complete before the cinematic minimum duration", () => {
    const { result } = renderHook(() => useStartupLoader({ isReady: true }));

    act(() => {
      jest.advanceTimersByTime(startupLoaderConfig.timing.durationSeconds * 1000 - 50);
    });

    expect(result.current.isComplete).toBe(false);
    expect(result.current.progress).toBeLessThan(100);
  });

  it("holds progress at the readiness cap when content is still pending", () => {
    const { result } = renderHook(() => useStartupLoader({ isReady: false }));

    act(() => {
      jest.advanceTimersByTime(startupLoaderConfig.timing.durationSeconds * 1000);
    });

    expect(result.current.isComplete).toBe(false);
    expect(result.current.progress).toBe(
      startupLoaderConfig.timing.readinessProgressCap
    );
  });

  it("completes after the minimum duration when readiness becomes true", () => {
    const { result, rerender } = renderHook(
      ({ isReady }) => useStartupLoader({ isReady }),
      {
        initialProps: {
          isReady: false,
        },
      }
    );

    act(() => {
      jest.advanceTimersByTime(startupLoaderConfig.timing.durationSeconds * 1000);
    });

    rerender({ isReady: true });

    act(() => {
      jest.advanceTimersByTime(50);
    });

    expect(result.current.progress).toBe(100);
    expect(result.current.statusText).toBe(startupLoaderConfig.text.finalStatusLabel);
    expect(result.current.isComplete).toBe(false);

    act(() => {
      jest.advanceTimersByTime(startupLoaderConfig.timing.finalStatusHoldMs);
    });

    expect(result.current.isComplete).toBe(true);
  });

  it("completes after the max wait fallback even if readiness never arrives", () => {
    const { result } = renderHook(() => useStartupLoader({ isReady: false }));

    act(() => {
      jest.advanceTimersByTime(startupLoaderConfig.timing.maxWaitSeconds * 1000);
    });

    expect(result.current.progress).toBe(100);
    expect(result.current.statusText).toBe(startupLoaderConfig.text.finalStatusLabel);
    expect(result.current.isComplete).toBe(false);

    act(() => {
      jest.advanceTimersByTime(startupLoaderConfig.timing.finalStatusHoldMs);
    });

    expect(result.current.isComplete).toBe(true);
  });
});
