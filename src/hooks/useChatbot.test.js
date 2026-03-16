import { act, renderHook, waitFor } from "@testing-library/react";
import useChatbot from "./useChatbot";
import { askAssistantStream } from "../api/assistantClient";

jest.mock("../api/assistantClient", () => ({
  askAssistantStream: jest.fn(),
}));

const CHAT_STORAGE_KEY = "chatHistory";

describe("useChatbot", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("restores saved chat messages from localStorage", async () => {
    localStorage.setItem(
      CHAT_STORAGE_KEY,
      JSON.stringify([
        {
          id: 7,
          sender: "user",
          text: "Saved message",
        },
      ])
    );

    const { result } = renderHook(() => useChatbot());

    await waitFor(() => {
      expect(result.current.messages).toHaveLength(1);
    });

    expect(result.current.messages[0]).toEqual({
      id: 7,
      sender: "user",
      text: "Saved message",
      ctas: [],
      isStreaming: false,
    });
  });

  it("resets back to intro messages when the user sends clear", async () => {
    askAssistantStream.mockResolvedValue(undefined);

    const { result } = renderHook(() => useChatbot());

    await waitFor(() => {
      expect(result.current.messages).toHaveLength(2);
    });

    act(() => {
      result.current.sendMessage("clear");
    });

    expect(result.current.messages).toHaveLength(2);
    expect(result.current.messages[0].text).toContain("personal chatbot");
    expect(result.current.messages[1].text).toContain("Type 'clear' or 'reset'");
  });

  it("shows the fallback assistant error when streaming fails", async () => {
    askAssistantStream.mockRejectedValue(new Error("Server error"));

    const { result } = renderHook(() => useChatbot());

    await waitFor(() => {
      expect(result.current.messages).toHaveLength(2);
    });

    await act(async () => {
      await result.current.sendMessage("Tell me about projects");
    });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(
      result.current.messages[result.current.messages.length - 1].text
    ).toBe("Error: Unable to get response.");
  });
});
