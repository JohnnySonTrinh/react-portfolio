import OpenAI from "openai";
import buildSystemMessage from "./systemMessage.js";

const MODEL = "gpt-4o-mini";
const TEMPERATURE = 0.7;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
    const response = await client.responses.create({
      model: MODEL,
      instructions: systemMessage,
      input: userText,
      temperature: TEMPERATURE,
    });

    const reply = response.output_text?.trim() || "";
    return res.status(200).json({ text: reply });
  } catch (e) {
    if (e instanceof SyntaxError) {
      return res.status(400).json({ error: "Invalid JSON body" });
    }

    return res.status(500).json({ error: e.message || "Server error" });
  }
}
