import { StateGraph, END, START } from "@langchain/langgraph";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { config } from "../config/config.js";
import { semanticSearch } from "./Embedding.service.js";

// ─── Gemini Pro for reasoning ─────────────────────────────
const geminiPro = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  apiKey: config.geminiApiKey,
  temperature: 0.3,
  maxRetries: 2,
});

// ─── State definition ─────────────────────────────────────
// LangGraph state — each node receives this and returns partial update
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

// ─── Node 1: Query Analyzer ───────────────────────────────
// Classify the query type to route correctly
const analyzeQuery = async (state) => {
  const { query } = state;

  try {
    const prompt = `Classify this user query into one of three types:
- "search": User wants to find/list specific items they saved
- "question": User has a question that their saved content might answer  
- "summary": User wants an overview/digest of their collection

Query: "${query}"

Return only one word: search, question, or summary`;

    const result = await geminiPro.invoke(prompt);
    const raw = typeof result.content === "string" ? result.content.trim().toLowerCase() : "question";
    const queryType = ["search", "question", "summary"].includes(raw) ? raw : "question";
    return { queryType };
  } catch {
    return { queryType: "question" };
  }
};

// ─── Node 2: Retriever ────────────────────────────────────
// Find relevant items using semantic search
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

// ─── Node 3: Context Builder ──────────────────────────────
// Format retrieved items as readable context for the LLM
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
        `[Item ${i + 1}] Title: ${item.title}\nType: ${item.type}\nSummary: ${item.summary || item.description || "No description"}\nTags: ${item.tags?.join(", ") || "none"}\n`
    )
    .join("\n---\n");

  return { context, sources };
};

// ─── Node 4: RAG Responder ────────────────────────────────
// Generate answer using retrieved context
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
    const result = await geminiPro.invoke(prompt);
    const answer =
      typeof result.content === "string"
        ? result.content
        : result.content?.map?.((c) => c.text ?? "").join("") ?? "Sorry, I couldn't generate a response.";
    return { answer };
  } catch (err) {
    console.error("❌ RAG responder error:", err.message);
    return {
      answer:
        "I had trouble generating a response. Please try again.",
      error: err.message,
    };
  }
};

// ─── Build LangGraph ──────────────────────────────────────
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

  // Add nodes
  graph.addNode("analyzeQuery", analyzeQuery);
  graph.addNode("retrieveItems", retrieveItems);
  graph.addNode("buildContext", buildContext);
  graph.addNode("generateAnswer", generateAnswer);

  // Add edges (linear flow)
  graph.addEdge(START, "analyzeQuery");
  graph.addEdge("analyzeQuery", "retrieveItems");
  graph.addEdge("retrieveItems", "buildContext");
  graph.addEdge("buildContext", "generateAnswer");
  graph.addEdge("generateAnswer", END);

  return graph.compile();
};

// ─── Singleton compiled graph ─────────────────────────────
let ragApp = null;

const getRAGApp = () => {
  if (!ragApp) ragApp = buildRAGGraph();
  return ragApp;
};

// ─── Main export: chat with collection ───────────────────
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
