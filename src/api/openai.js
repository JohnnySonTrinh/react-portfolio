import { Configuration, OpenAIApi } from "openai";
import systemMessage from "../data/chatData";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const fetchOpenAIResponse = async (userText) => {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: userText },
      ],
    });

    return (
      response.data.choices[0].message.content || "Oops! Something went wrong."
    );
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return "Bruh... My API call just whiffed. Try again.";
  }
};
