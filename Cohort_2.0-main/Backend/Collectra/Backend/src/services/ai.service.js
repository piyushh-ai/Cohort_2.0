import { ChatGroq } from "@langchain/groq";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { z } from "zod";
import { config } from "../config/config.js";
import ItemModel from "../models/item.model.js";

// ─── Models ───────────────────────────────────────────────
const geminiFlash = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  apiKey: config.geminiApiKey,
  temperature: 0.2,
  maxRetries: 2,
});

const groqFallback = new ChatGroq({
  model: "llama-3.1-8b-instant",
  apiKey: config.groqApiKey,
  temperature: 0.2,
  timeout: 12000,
  maxRetries: 2,
});

// ─── Zod schema for structured output ─────────────────────
const tagSchema = z.object({
  tags: z.array(z.string()).describe("3-5 canonical lowercase topic tags for this content"),
  summary: z.string().describe("2-3 sentence summary of what this content is about"),
  category: z.string().describe("Single main topic category e.g. 'programming', 'music', 'design'"),
});

// ─── Structured model (Gemini → Groq fallback) ────────────
const geminiStructured = geminiFlash.withStructuredOutput(tagSchema, {
  name: "content_metadata",
});

// ─── Tagging prompt ─────────────────────────────────────
const TAGGING_SYSTEM = `You are a smart content metadata extractor. 
Your job is to identify what content is ACTUALLY ABOUT — not its format or quality.

RULES FOR TAGS:
- Lowercase only, 1-3 words max per tag
- NO format words: never use "video", "article", "pdf", "song", "music video", "tutorial", "guide"
- NO quality words: "best", "top", "amazing", "official", "full", "new", "free"
- NO action words: "watch", "subscribe", "download", "learn", "read"
- Tags answer "What is this content ABOUT?" not "What type is it?"
- Be specific: use "bollywood" not "indian music", use "minecraft" not "gaming content"

EXAMPLES:
- "Kesariya - Arijit Singh | Brahmaastra" → tags: ["bollywood", "arijit singh", "brahmaastra"]
- "REST API Notes PDF" → tags: ["rest api", "web development", "backend"]
- "ChatGPT image generation" → tags: ["artificial intelligence", "chatgpt", "image generation"]`;

// ─── Helper: sleep ─────────────────────────────────────
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ─── Main: generate tags + summary ────────────────────────
export const generateTagsAndSummary = async (title, description, type) => {
  const userInput = `Title: ${title}\nDescription: ${description || "No description available"}\nContent type: ${type || "article"}`;

  // Attempt 1: Gemini Flash with structured output
  try {
    const result = await geminiStructured.invoke([
      { role: "system", content: TAGGING_SYSTEM },
      { role: "user", content: userInput },
    ]);

    return {
      tags: Array.isArray(result.tags) ? result.tags : [],
      summary: result.summary || "",
      category: result.category || type || "General",
    };
  } catch (geminiErr) {
    console.warn("⚠️ Gemini tagging failed, trying Groq fallback:", geminiErr.message);
  }

  // Attempt 2: Groq with manual JSON parsing
  try {
    const prompt = `${TAGGING_SYSTEM}

${userInput}

Return ONLY valid JSON in this exact format (no markdown, no explanation):
{"tags": ["tag1", "tag2"], "summary": "2-3 sentence summary.", "category": "main category"}`;

    const result = await groqFallback.invoke(prompt);
    const raw = typeof result.content === "string" ? result.content : result.content?.map?.((c) => c.text ?? "").join("") ?? "";

    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    if (start !== -1 && end > start) {
      const parsed = JSON.parse(raw.slice(start, end + 1));
      return {
        tags: Array.isArray(parsed.tags) ? parsed.tags : [],
        summary: parsed.summary || "",
        category: parsed.category || type || "General",
      };
    }
  } catch (groqErr) {
    console.warn("⚠️ Groq tagging failed, using keyword fallback:", groqErr.message);
  }

  // Attempt 3: Keyword extraction fallback
  return keywordFallback(title, description, type);
};

// ─── Keyword fallback ─────────────────────────────────
const keywordFallback = (title, description, type) => {
  const stopWords = new Set([
    "the", "a", "an", "is", "in", "on", "at", "to", "for", "of", "and", "or",
    "but", "with", "how", "what", "why", "when", "where", "this", "that",
    "from", "are", "was", "were", "have", "has", "had", "will", "would",
    "could", "should", "its", "your", "their", "about", "into", "over",
    "after", "before", "between", "just",
  ]);

  const desc = description || "";
  const titleWords = title.toLowerCase().split(/\W+/).filter((w) => w.length >= 4 && !stopWords.has(w)).slice(0, 3);
  const descWords = desc.toLowerCase().split(/\W+/).filter((w) => w.length >= 5 && !stopWords.has(w)).slice(0, 3);
  const tags = [...new Set([...titleWords, ...descWords].filter(Boolean))];

  return {
    tags,
    summary: desc.slice(0, 240) || `Saved item: ${title}`,
    category: type || "General",
  };
};

// ─── Background job: tag + save ──────────────────────────
export const runBackgroundJobs = async (item) => {
  try {
    const aiResult = await generateTagsAndSummary(item.title, item.description, item.type);
    await ItemModel.findByIdAndUpdate(item._id, {
      tags: aiResult.tags,
      summary: aiResult.summary,
      aiProcessed: true,
    });
    console.log(`✅ AI tagged: "${item.title}" → [${aiResult.tags.join(", ")}]`);
    // Trigger embedding AFTER tags are saved
    const { generateAndSaveEmbedding } = await import("./Embedding.service.js");
    await generateAndSaveEmbedding(item._id);
  } catch (err) {
    console.error("❌ Background job error:", err.message);
  }
};

// ─── Generate highlights ──────────────────────────────────
export const generateHighlights = async (title, description, summary) => {
  const content = description || summary || "";
  const hasContent = content.trim().length > 20;

  const prompt = hasContent
    ? `Extract the 3-5 most important and insightful sentences from this content. Return ONLY a JSON array of strings.

Title: ${title}
Content: ${content.slice(0, 2000)}

Example output: ["First key insight.", "Second important fact.", "Third takeaway."]`
    : `Based on this title, generate 3-5 insightful things a person might want to know about this topic. Return ONLY a JSON array of strings.

Title: ${title}

Example output: ["First insight about the topic.", "Second key fact.", "Third takeaway."]`;

  // Try Gemini first
  try {
    const result = await geminiFlash.invoke(prompt);
    const raw = typeof result.content === "string" ? result.content : result.content?.map?.((c) => c.text ?? "").join("") ?? "";
    const start = raw.indexOf("[");
    const end = raw.lastIndexOf("]");
    if (start !== -1 && end > start) {
      const highlights = JSON.parse(raw.slice(start, end + 1));
      if (Array.isArray(highlights)) return highlights;
    }
  } catch {
    // fall through
  }

  // Try Groq fallback
  try {
    const result = await groqFallback.invoke(prompt);
    const raw = typeof result.content === "string" ? result.content : result.content?.map?.((c) => c.text ?? "").join("") ?? "";
    const start = raw.indexOf("[");
    const end = raw.lastIndexOf("]");
    if (start !== -1 && end > start) {
      const highlights = JSON.parse(raw.slice(start, end + 1));
      if (Array.isArray(highlights)) return highlights;
    }
  } catch {
    // fall through
  }

  // Sentence extraction fallback
  const base = content;
  if (!base) return [];
  return base.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter((s) => s.length > 20).slice(0, 5);
};

// ─── Generate deep item insight (NEW) ────────────────────
export const generateItemInsight = async (item) => {
  const content = [item.title, item.description, item.summary, item.tags?.join(", ")].filter(Boolean).join("\n");

  const prompt = `Analyze this saved content item and provide a structured insight.

Content:
${content.slice(0, 2000)}

Provide:
1. keyConcepts: 3-5 core concepts in this content (string[])
2. whySaved: Why would someone save this? (1 sentence)
3. actionItems: 2-3 things the reader could do with this info (string[])
4. relatedTopics: 3 broader topics this connects to (string[])
5. estimatedReadTime: Rough estimate like "5 min read" (string)

Return ONLY valid JSON matching this structure:
{
  "keyConcepts": ["concept1", "concept2"],
  "whySaved": "...",
  "actionItems": ["action1", "action2"],
  "relatedTopics": ["topic1", "topic2"],
  "estimatedReadTime": "5 min read"
}`;

  try {
    const result = await geminiFlash.invoke(prompt);
    const raw = typeof result.content === "string" ? result.content : result.content?.map?.((c) => c.text ?? "").join("") ?? "";
    const start = raw.indexOf("{");
    const end = raw.lastIndexOf("}");
    if (start !== -1 && end > start) {
      return JSON.parse(raw.slice(start, end + 1));
    }
  } catch (err) {
    console.error("❌ Item insight error:", err.message);
  }

  // Fallback
  return {
    keyConcepts: item.tags?.slice(0, 3) || [],
    whySaved: item.summary || "Content worth reviewing",
    actionItems: ["Review the content", "Take notes", "Share with others"],
    relatedTopics: item.tags?.slice(0, 3) || [],
    estimatedReadTime: "5 min read",
  };
};

// ─── Export models for use in RAG agent ──────────────────
export { geminiFlash, groqFallback };
