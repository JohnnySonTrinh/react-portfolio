import OpenAI from "openai";
import { extractChatCtas } from "./chatCta.js";
import buildSystemMessage from "./systemMessage.js";

const MODEL = "gpt-4o-mini";
const TEMPERATURE = 0.7;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function wantsStreaming(req) {
  const acceptHeader = req.headers?.accept || "";
  return acceptHeader.includes("application/x-ndjson");
}

function writeStreamEvent(res, payload) {
  res.write(`${JSON.stringify(payload)}\n`);
}

function parseBody(body) {
  if (!body) {
    return {};
  }

  if (typeof body === "string") {
    return JSON.parse(body || "{}");
  }

  return body;
}

// API route handler
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "Missing OPENAI_API_KEY" });
    }

    const body = parseBody(req.body);
    const userText =
      typeof body.userText === "string" ? body.userText.trim() : "";

    if (!userText) {
      return res.status(400).json({ error: "Missing userText" });
    }

    const systemMessage = buildSystemMessage();
    const streamRequested = wantsStreaming(req);

    if (!streamRequested) {
      const response = await client.responses.create({
        model: MODEL,
        instructions: systemMessage,
        input: userText,
        temperature: TEMPERATURE,
      });

      const reply = response.output_text?.trim() || "";
      return res.status(200).json({
        text: reply,
        ctas: extractChatCtas(reply),
      });
    }

    const abortController = new AbortController();
    req.on("close", () => abortController.abort());

    res.writeHead(200, {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    });

    const stream = await client.responses.create(
      {
        model: MODEL,
        instructions: systemMessage,
        input: userText,
        temperature: TEMPERATURE,
        stream: true,
      },
      { signal: abortController.signal }
    );

    let fullText = "";

    for await (const event of stream) {
      if (event.type === "response.output_text.delta") {
        fullText += event.delta;
        writeStreamEvent(res, {
          type: "text",
          chunk: event.delta,
        });
      }

      if (event.type === "response.completed") {
        fullText = event.response.output_text?.trim() || fullText.trim();
      }
    }

    writeStreamEvent(res, {
      type: "done",
      text: fullText,
      ctas: extractChatCtas(fullText),
    });
    return res.end();
  } catch (e) {
    if (e instanceof SyntaxError) {
      return res.status(400).json({ error: "Invalid JSON body" });
    }

    if (e?.name === "AbortError" || e?.name === "APIUserAbortError") {
      if (res.headersSent) {
        return res.end();
      }

      return res.status(499).end();
    }

    if (wantsStreaming(req) && !res.headersSent) {
      return res
        .status(500)
        .json({ error: e.message || "Server error" });
    }

    if (wantsStreaming(req) && res.headersSent) {
      writeStreamEvent(res, {
        type: "error",
        error: e.message || "Server error",
      });
      return res.end();
    }

    return res.status(500).json({ error: e.message || "Server error" });
  }
}
