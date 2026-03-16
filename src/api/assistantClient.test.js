import { askAssistant, askAssistantStream } from "./assistantClient";
import { TextDecoder } from "util";

global.TextDecoder = TextDecoder;

describe("askAssistant", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("returns chatbot text on success", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        text: "Hello from assistant",
        ctas: [
          { label: "View Projects", route: "/projects" },
          { label: "View Skills", route: "/skills" },
        ],
      }),
    });

    await expect(askAssistant("hello")).resolves.toEqual({
      text: "Hello from assistant",
      ctas: [
        { label: "View Projects", route: "/projects" },
        { label: "View Skills", route: "/skills" },
      ],
    });
    expect(global.fetch).toHaveBeenCalledWith("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userText: "hello" }),
    });
  });

  it("throws the api error message when the request fails", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ error: "Server error" }),
    });

    await expect(askAssistant("hello")).rejects.toThrow("Server error");
  });

  it("throws a fallback error for a non-json response", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 502,
      json: async () => {
        throw new Error("Unexpected token");
      },
    });

    await expect(askAssistant("hello")).rejects.toThrow(
      "Bad response from API (502)"
    );
  });
});

describe("askAssistantStream", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("streams text chunks and returns the done payload", async () => {
    const onText = jest.fn();
    const onDone = jest.fn();
    const chunks = [
      `${JSON.stringify({ type: "text", chunk: "Hello " })}\n`,
      `${JSON.stringify({
        type: "done",
        text: "Hello from stream",
        ctas: [{ label: "View Projects", route: "/projects" }],
      })}\n`,
    ];
    let index = 0;

    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      body: {
        getReader: () => ({
          read: async () => {
            if (index >= chunks.length) {
              return { done: true };
            }

            const value = Buffer.from(chunks[index], "utf-8");
            index += 1;

            return { value, done: false };
          },
        }),
      },
    });

    await askAssistantStream("hello", { onText, onDone });

    expect(global.fetch).toHaveBeenCalledWith("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/x-ndjson",
      },
      body: JSON.stringify({ userText: "hello" }),
      signal: undefined,
    });
    expect(onText).toHaveBeenCalledWith("Hello ");
    expect(onDone).toHaveBeenCalledWith({
      text: "Hello from stream",
      ctas: [{ label: "View Projects", route: "/projects" }],
    });
  });

  it("throws the api error message when the streaming request fails", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ error: "Server error" }),
    });

    await expect(askAssistantStream("hello")).rejects.toThrow("Server error");
  });

  it("throws when the browser does not support streaming", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      status: 200,
      body: null,
    });

    await expect(askAssistantStream("hello")).rejects.toThrow(
      "Streaming is not supported in this browser."
    );
  });
});
