import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
});

export async function testAI() {
  model.invoke("who is lord shiva explain in 50 words in hinglish").then((response) => {
    console.log(response.content);
  });
}
