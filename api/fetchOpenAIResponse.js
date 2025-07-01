import { Configuration, OpenAIApi } from "openai";
import systemMessage from "../data/chatData"; // ✅ adjust if needed

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // ✅ must exist in .env
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { userText } = req.body;
  console.log("🟡 userText:", userText); // 👈 Add this log

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: userText },
      ],
    });

    const reply = response.data.choices[0].message.content;
    console.log("✅ OpenAI replied:", reply);
    res.status(200).json({ text: reply });
  } catch (error) {
    console.error("🔥 API crashed:", error.message);
    console.error("🔥 Full error:", error); // 👈 Full stack trace
    res.status(500).json({ text: "Error: Unable to get response." });
  }
}
