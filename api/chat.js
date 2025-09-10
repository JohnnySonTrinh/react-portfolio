import { Configuration, OpenAIApi } from "openai";
import buildSystemMessage from "./systemMessage.js";

// Initialize OpenAI API
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

// API route handler
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
    const { userText } = body;
    if (!userText) return res.status(400).json({ error: "Missing userText" });

    // Build system message from profile data
    const systemMessage = buildSystemMessage();

    // Call OpenAI Chat Completion
    const response = await openai.createChatCompletion({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: userText }
      ],
      // Set response format and other parameters
      temperature: 0.7
    });

    // Extract and return the AI's reply
    const reply = response.data?.choices?.[0]?.message?.content ?? "";
    return res.status(200).json({ text: reply });
  } catch (e) {
    return res.status(500).json({ error: e.message || "Server error" });
  }
}
