import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import {
  HumanMessage,
  AIMessage,
  SystemMessage,
} from "@langchain/core/messages";
import { getSearchContext } from "./Tavily.service.js";

// Gemini — main chat responses
const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: process.env.GEMINI_API_KEY,
});

// Mistral — title generation only (fast & cheap)
const mistralModel = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

/**
 * Decides if the query needs a web search.
 * Mistral quickly classifies: "search" or "skip"
 */
async function shouldSearch(userMessage) {
  const response = await mistralModel.invoke([
    new SystemMessage(`
You are a classifier. Decide if a user query needs a real-time web search.

Reply with ONLY one word:
- "search" → if the query is about current events, recent news, live data, prices, sports scores, new releases, or anything time-sensitive
- "skip" → if it's general knowledge, coding, math, definitions, or anything you can answer without internet

No explanation. One word only.
`),
    new HumanMessage(userMessage),
  ]);

  const decision =
    typeof response.content === "string"
      ? response.content.trim().toLowerCase()
      : "skip";

  return decision === "search";
}

/**
 * Main agent function — Perplexity-style:
 * 1. Mistral decides if search is needed
 * 2. If yes → Tavily fetches context → Gemini answers with sources
 * 3. If no  → Gemini answers directly from knowledge
 *
 * @param {Array} messages - [{role: "user"|"ai", content: string}]
 * @returns {{ content: string, sources: Array, searched: boolean }}
 */
export async function generateAgentResponse(messages) {
  const latestUserMessage =
    [...messages].reverse().find((m) => m.role === "user")?.content || "";

  let systemPrompt;
  let sources = [];
  let searched = false;

  const needsSearch = await shouldSearch(latestUserMessage);

  if (needsSearch) {
    searched = true;
    const { context, answer } = await getSearchContext(latestUserMessage);
    sources = context; // raw formatted string with URLs

    systemPrompt = `
You are a helpful AI assistant like Perplexity AI.

Here is real-time web search context for the user's query:
---
${context}
---
Tavily quick answer: ${answer || "N/A"}

Instructions:
- Answer using the search context above
- Cite sources as [1], [2] etc. where relevant
- Be concise and clear
- Format in clean markdown
`;
  } else {
    systemPrompt = `
You are a helpful AI assistant.
Answer clearly and concisely.
Format in clean markdown when helpful.
`;
  }

  const langchainMessages = [
    new SystemMessage(systemPrompt),
    ...messages
      .map((msg) => {
        if (msg.role === "user") return new HumanMessage(msg.content);
        if (msg.role === "ai") return new AIMessage(msg.content);
      })
      .filter(Boolean),
  ];

  const response = await geminiModel.invoke(langchainMessages);

  let content;
  if (typeof response.content === "string") content = response.content;
  else if (Array.isArray(response.content)) {
    content = response.content
      .map((c) => (typeof c === "string" ? c : c.text || ""))
      .join("");
  } else {
    content = String(response.content);
  }

  return { content, sources, searched };
}

/**
 * Title generation — Mistral
 */
export async function generateTitle(message) {
  const response = await mistralModel.invoke([
    new SystemMessage(`
You are an expert at generating short, clear titles.
Rules:
- ONE title only
- Under 8 words
- No emojis, no quotes, no explanation
- Just the title text
`),
    new HumanMessage(`Generate a title for: "${message}"`),
  ]);

  return typeof response.content === "string"
    ? response.content.trim()
    : String(response.content).trim();
}
