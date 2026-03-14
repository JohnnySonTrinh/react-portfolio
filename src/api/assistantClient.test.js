import { askAssistant } from "./assistantClient";

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
