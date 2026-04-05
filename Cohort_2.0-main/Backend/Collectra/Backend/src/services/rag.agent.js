import { StateGraph, END, START } from "@langchain/langgraph";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { config } from "../config/config.js";
import { semanticSearch } from "./Embedding.service.js";

// ─── Exponential backoff for rate-limit errors ─────────────
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const invokeWithRetry = async (model, prompt, maxRetries = 3) => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await model.invoke(prompt);
    } catch (err) {
      const is429 = err?.message?.includes("429") || err?.status === 429;
      if (is429 && attempt < maxRetries - 1) {
        // Extract retryDelay from error message if available, else use backoff
        const retryMatch = err.message?.match(/"retryDelay":"(\d+)s"/);
        const waitMs = retryMatch
          ? parseInt(retryMatch[1], 10) * 1000 + 500
          : Math.min(2 ** attempt * 5000, 60000); // 5s, 10s, 20s …
        console.warn(`⚠️  Gemini 429 – retrying in ${waitMs / 1000}s (attempt ${attempt + 1}/${maxRetries})`);
        await sleep(waitMs);
      } else {
        throw err;
      }
    }
  }
};

// ─── Gemini model (flash-8b → higher free-tier quota) ──────
const geminiPro = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash-8b",   // lightweight, higher free-tier RPM
  apiKey: config.geminiApiKey,
  temperature: 0.3,
  maxRetries: 0,                   // we handle retries ourselves
});

// ─── State definition ──────────────────────────────────────
const initialState = {
  query: "",
  userId: "",
  queryType: "question", // "search" | "question" | "summary"
  retrievedItems: [],
  context: "",
  answer: "",
  sources: [],
  error: null,
};

// ─── Node 1: Query Analyzer (no LLM – keyword heuristic) ──
// Saves one API call per request on the free tier.
const analyzeQuery = async (state) => {
  const { query } = state;
  const q = query.toLowerCase();

  let queryType = "question";
  if (/\b(find|show|list|search|give me|what.*saved|do i have)\b/.test(q)) {
    queryType = "search";
  } else if (/\b(summar|overview|digest|all my|everything|collection)\b/.test(q)) {
    queryType = "summary";
  }

  return { queryType };
};

// ─── Node 2: Retriever ─────────────────────────────────────
const retrieveItems = async (state) => {
  const { userId, query, queryType } = state;

  try {
    const limit = queryType === "summary" ? 15 : 8;
    const items = await semanticSearch(userId, query, limit);
    return { retrievedItems: items };
  } catch (err) {
    console.error("❌ RAG retriever error:", err.message);
    return { retrievedItems: [], error: err.message };
  }
};

// ─── Node 3: Context Builder ───────────────────────────────
const buildContext = async (state) => {
  const { retrievedItems } = state;

  if (retrievedItems.length === 0) {
    return {
      context: "No relevant items found in the user's collection.",
      sources: [],
    };
  }

  const sources = retrievedItems.map((item) => ({
    id: item._id?.toString(),
    title: item.title,
    url: item.url,
    type: item.type,
    relevanceScore: item.relevanceScore,
  }));

  const context = retrievedItems
    .map(
      (item, i) =>
        `[Item ${i + 1}] Title: ${item.title}\nType: ${item.type}\nSummary: ${
          item.summary || item.description || "No description"
        }\nTags: ${item.tags?.join(", ") || "none"}\n`
    )
    .join("\n---\n");

  return { context, sources };
};

// ─── Node 4: RAG Responder ─────────────────────────────────
const generateAnswer = async (state) => {
  const { query, context, queryType, retrievedItems } = state;

  if (retrievedItems.length === 0) {
    return {
      answer:
        "I couldn't find any relevant items in your collection for this query. Try saving more content or rephrasing your question.",
    };
  }

  let systemPrompt;

  if (queryType === "summary") {
    systemPrompt = `You are a personal knowledge assistant. The user wants a summary of their saved collection.
Analyze the items and provide a structured digest: main topics, key insights, and recommendations.`;
  } else if (queryType === "search") {
    systemPrompt = `You are a personal knowledge assistant helping users find items in their saved collection.
List the most relevant items found and briefly explain why each is relevant.`;
  } else {
    systemPrompt = `You are a personal knowledge assistant with access to the user's saved content library.
Answer the user's question based ONLY on the context provided from their saved items.
If the context doesn't contain enough information, say so honestly.
Always cite which items you're drawing from.`;
  }

  const prompt = `${systemPrompt}

User's saved items (context):
${context}

User query: "${query}"

Provide a helpful, conversational response. Be concise but informative. Reference specific items by their title when relevant.`;

  try {
    const result = await invokeWithRetry(geminiPro, prompt);
    const answer =
      typeof result.content === "string"
        ? result.content
        : result.content?.map?.((c) => c.text ?? "").join("") ??
          "Sorry, I couldn't generate a response.";
    return { answer };
  } catch (err) {
    console.error("❌ RAG responder error:", err.message);

    const is429 = err?.message?.includes("429") || err?.status === 429;
    return {
      answer: is429
        ? "⚠️ The AI is temporarily rate-limited. Please wait a minute and try again."
        : "I had trouble generating a response. Please try again.",
      error: err.message,
    };
  }
};

// ─── Build LangGraph ───────────────────────────────────────
const buildRAGGraph = () => {
  const graph = new StateGraph({
    channels: {
      query: { value: (x, y) => (y !== undefined ? y : x), default: () => "" },
      userId: { value: (x, y) => (y !== undefined ? y : x), default: () => "" },
      queryType: { value: (x, y) => (y !== undefined ? y : x), default: () => "question" },
      retrievedItems: { value: (x, y) => (y !== undefined ? y : x), default: () => [] },
      context: { value: (x, y) => (y !== undefined ? y : x), default: () => "" },
      answer: { value: (x, y) => (y !== undefined ? y : x), default: () => "" },
      sources: { value: (x, y) => (y !== undefined ? y : x), default: () => [] },
      error: { value: (x, y) => (y !== undefined ? y : x), default: () => null },
    },
  });

  graph.addNode("analyzeQuery", analyzeQuery);
  graph.addNode("retrieveItems", retrieveItems);
  graph.addNode("buildContext", buildContext);
  graph.addNode("generateAnswer", generateAnswer);

  graph.addEdge(START, "analyzeQuery");
  graph.addEdge("analyzeQuery", "retrieveItems");
  graph.addEdge("retrieveItems", "buildContext");
  graph.addEdge("buildContext", "generateAnswer");
  graph.addEdge("generateAnswer", END);

  return graph.compile();
};

// ─── Singleton compiled graph ──────────────────────────────
let ragApp = null;

const getRAGApp = () => {
  if (!ragApp) ragApp = buildRAGGraph();
  return ragApp;
};

// ─── Main export: chat with collection ────────────────────
export const chatWithCollection = async (userId, query) => {
  try {
    const app = getRAGApp();
    const result = await app.invoke({
      query: query.trim(),
      userId: userId.toString(),
    });

    return {
      answer: result.answer,
      sources: result.sources || [],
      queryType: result.queryType,
    };
  } catch (err) {
    console.error("❌ RAG agent error:", err.message);
    throw err;
  }
};
