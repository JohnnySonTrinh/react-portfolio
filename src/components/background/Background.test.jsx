import { fireEvent, render, screen } from "@testing-library/react";
import Background from "./Background";
import useBackgroundMedia from "../../hooks/useBackgroundMedia";

jest.mock("../../hooks/useBackgroundMedia", () => jest.fn());

describe("Background", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("reports ready immediately when background video is disabled", () => {
    const onReady = jest.fn();

    useBackgroundMedia.mockReturnValue({
      videoRef: { current: null },
      showBackgroundVideo: false,
    });

    render(<Background onReady={onReady} />);

    expect(onReady).toHaveBeenCalled();
  });

  it("reports ready when the enabled video has loaded its first frame", () => {
    const onReady = jest.fn();

    useBackgroundMedia.mockReturnValue({
      videoRef: { current: null },
      showBackgroundVideo: true,
    });

    render(<Background onReady={onReady} />);

    expect(onReady).not.toHaveBeenCalled();

    fireEvent.loadedData(screen.getByLabelText("Background video"));

    expect(onReady).toHaveBeenCalledTimes(1);
  });
});
