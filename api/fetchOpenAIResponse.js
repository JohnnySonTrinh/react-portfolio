import { Configuration, OpenAIApi } from "openai";
import systemMessage from "../data/chatData";

// Create a configuration object with the API key from environment variables
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize OpenAI client
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  // Extract user input from request body
  const { userText } = req.body;

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: userText },
      ],
    });

    // Extract the assistant's reply
    const reply = response.data.choices[0].message.content;

    // Return the response as JSON
    res.status(200).json({ text: reply });
  } catch (error) {
    // Return error response if something goes wrong
    res.status(500).json({ text: "Error: Unable to get response." });
  }
}
