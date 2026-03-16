import { act, renderHook, waitFor } from "@testing-library/react";
import Vapi from "@vapi-ai/web";
import useVoiceAssistant from "./useVoiceAssistant";

jest.mock("@vapi-ai/web", () => jest.fn());

let mockVapiInstance;

describe("useVoiceAssistant", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});

    process.env.REACT_APP_VAPI_PUBLIC_KEY = "public-key";
    process.env.REACT_APP_VAPI_AGENT_ID = "agent-id";

    Vapi.mockImplementation(function MockVapi() {
      const handlers = {};

      this.on = jest.fn((event, handler) => {
        handlers[event] = handler;
      });
      this.start = jest.fn();
      this.stop = jest.fn();
      this.emit = (event, payload) => {
        handlers[event]?.(payload);
      };

      mockVapiInstance = this;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("creates the Vapi client and starts calls with the configured agent id", () => {
    const { result } = renderHook(() => useVoiceAssistant());

    expect(Vapi).toHaveBeenCalledWith("public-key");

    act(() => {
      result.current.startCall();
    });

    expect(mockVapiInstance.start).toHaveBeenCalledWith("agent-id");
  });

  it("appends final transcript messages and updates assistant typing state", async () => {
    const { result } = renderHook(() => useVoiceAssistant());

    act(() => {
      mockVapiInstance.emit("message", {
        type: "speech-update",
        role: "assistant",
        status: "started",
      });
    });

    expect(result.current.isAssistantTyping).toBe(true);

    act(() => {
      mockVapiInstance.emit("message", {
        type: "transcript",
        transcriptType: "final",
        role: "assistant",
        transcript: "Hello there",
      });
    });

    await waitFor(() => {
      expect(result.current.messages).toHaveLength(1);
    });

    expect(result.current.messages[0]).toEqual({
      role: "assistant",
      text: "Hello there",
    });
  });

  it("resets call state when the call ends", () => {
    const { result } = renderHook(() => useVoiceAssistant());

    act(() => {
      mockVapiInstance.emit("call-start", { id: "call-1" });
      mockVapiInstance.emit("message", {
        type: "speech-update",
        role: "assistant",
        status: "started",
      });
    });

    expect(result.current.inCall).toBe(true);
    expect(result.current.isAssistantTyping).toBe(true);

    act(() => {
      mockVapiInstance.emit("call-end");
    });

    expect(result.current.inCall).toBe(false);
    expect(result.current.isAssistantTyping).toBe(false);
  });
});
