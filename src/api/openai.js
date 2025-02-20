const OPENAI_API_KEY = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
console.log("API Key:", OPENAI_API_KEY); // Temporary check

export const fetchOpenAIResponse = async (userText) => {
  if (!OPENAI_API_KEY) {
    console.error("OpenAI API Key is missing! Check .env.local file.");
    return "Error: OpenAI API key is missing.";
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a helpful AI assistant named AI Johnny.",
          },
          { role: "user", content: userText },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return (
      data.choices?.[0]?.message?.content ||
      "Oops! Something went wrong. Try again!"
    );
  } catch (error) {
    console.error("Error fetching OpenAI response:", error);
    return "Error: Unable to fetch response.";
  }
};
