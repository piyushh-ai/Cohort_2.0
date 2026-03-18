import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, SystemMessage, AIMessage } from "langchain";

const GeminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: process.env.GEMINI_API_KEY,
});

const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

export async function generateMessage(messages) {
  const response = await GeminiModel.invoke(
    messages.map((msg) => {
      if (msg.role == "user") {
        return new HumanMessage(msg.content);
      } else if (msg.role == "ai") {
        return new AIMessage(msg.content);
      }
    }),
  );

  return response.content;
}

export async function generateTitle(message) {
  const response = await mistralModel.invoke([
    new SystemMessage(`
You are an expert at generating short, clear, and engaging titles.

Rules:
- Generate ONLY one title
- Keep it under 8 words
- No emojis
- No explanations
- Make it relevant and catchy
- Do not add quotes

Output should be just the title text.
`),
    new HumanMessage(`
Create a short and catchy title for the following message:

"${message}"

Remember:
- Keep it relevant
- Make it slightly engaging
- Output only the title
    `),
  ]);

  return response.content;
}
