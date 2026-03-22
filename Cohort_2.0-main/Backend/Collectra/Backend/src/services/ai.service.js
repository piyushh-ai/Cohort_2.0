import { ChatGroq } from "@langchain/groq"; // ← change
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";
import { config } from "../config/config.js";
import ItemModel from "../models/item.model.js";

const model = new ChatGroq({
  // ← change
  model: "llama-3.1-8b-instant", // fast + free
  apiKey: config.groqApiKey, // ← change
  temperature: 0.3,
  timeout: 10000, // ← 10 sec max — Render timeout se pehle fail ho
});

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    tags: z.array(z.string()).describe("5-7 canonical topic tags"),
    summary: z.string().describe("2-3 line summary of the content"),
    category: z.string().describe("Single main topic category"),
  }),
);

const taggingPrompt = PromptTemplate.fromTemplate(`
You are a smart content tagger. Your ONLY job is to identify what this content is ACTUALLY ABOUT, not what format it is.

Title: {title}
Description: {description}

Generate 3-5 tags that describe the REAL SUBJECT MATTER. 

RULES:
1. Lowercase only
2. NO format/type words: never use "video", "article", "pdf", "song", "music video", "tutorial", "guide", "course", "notes", "document"
3. NO quality words: "best", "top", "amazing", "official", "full", "new", "free"
4. NO action words: "watch", "subscribe", "download", "learn", "read"
5. Tags must answer: "What is this content ABOUT?" not "What type is it?"
6. Be specific enough to group related items: use "bollywood" not "indian", use "minecraft" not "gaming-content"
7. 1-3 words max per tag

EXAMPLES:
- "Kesariya - Arijit Singh | Brahmaastra" → ["bollywood", "arijit singh", "brahmaastra"]
- "Ramaiya Vastavaiya song" → ["bollywood", "ramaiya vastavaiya", "romantic"]  
- "Discord - Group Chat" → ["discord", "communication", "gaming"]
- "REST API Notes PDF" → ["rest api", "web development", "backend"]
- "Minecraft survival video" → ["minecraft", "gaming", "survival"]
- "ChatGPT image" → ["artificial intelligence", "chatgpt"]
- "One Direction - Best Song Ever" → ["one direction", "pop music", "english music"]
- "Indian Street Food tour" → ["street food", "food", "india"]
- "Ninja Hattori cartoon" → ["cartoon", "anime", "ninja hattori"]
- "WorkDir productivity app" → ["productivity", "developer tools"]

{format_instructions}

Return ONLY valid JSON, nothing else.
`);

export const generateTagsAndSummary = async (title, description, type) => {
  try {
    // Prompt ko format karo
    const prompt = await taggingPrompt.format({
      title,
      description: description || "No description available",
      type,
      format_instructions: parser.getFormatInstructions(),
    });

    // Model se raw text lo (LLM kabhi schema + example bhi bhej deta hai)
    const llmResult = await model.invoke(prompt);
    const rawText =
      typeof llmResult.content === "string"
        ? llmResult.content
        : Array.isArray(llmResult.content)
          ? llmResult.content.map((c) => c.text ?? "").join("\n")
          : "";

    // Try to grab JSON object between first '{' and last '}'
    const start = rawText.indexOf("{");
    const end = rawText.lastIndexOf("}");

    if (start === -1 || end === -1 || end <= start) {
      throw new Error(
        `No JSON object found in LLM output: ${rawText.slice(0, 200)}...`,
      );
    }

    const cleaned = rawText.slice(start, end + 1).trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      throw new Error(
        `Failed to parse tagging JSON. Snippet: ${cleaned.slice(0, 200)}...`,
      );
    }

    const tags = Array.isArray(parsed.tags) ? parsed.tags : [];
    const summary = typeof parsed.summary === "string" ? parsed.summary : "";
    const category = typeof parsed.category === "string" ? parsed.category : "";

    return { tags, summary, category };
  } catch (error) {
    // Fallback: meaningful word extraction — title ko pura tag mat banao
    const safeDescription = description || "";
    const fallbackSummary =
      safeDescription.slice(0, 240) || `Saved item: ${title}`;

    const stopWords = new Set([
      "the",
      "a",
      "an",
      "is",
      "in",
      "on",
      "at",
      "to",
      "for",
      "of",
      "and",
      "or",
      "but",
      "with",
      "how",
      "what",
      "why",
      "when",
      "where",
      "this",
      "that",
      "from",
      "are",
      "was",
      "were",
      "have",
      "has",
      "had",
      "will",
      "would",
      "could",
      "should",
      "its",
      "your",
      "their",
      "about",
      "into",
      "over",
      "after",
      "before",
      "between",
      "just",
    ]);

    // Title se meaningful words nikalo (4+ letters, no stop words)
    const titleWords = title
      .toLowerCase()
      .split(/\W+/)
      .filter((w) => w.length >= 5 && !stopWords.has(w))
      .slice(0, 3);

    // Description se meaningful words nikalo
    const descWords = safeDescription
      .toLowerCase()
      .split(/\W+/)
      .filter((w) => w.length >= 5 && !stopWords.has(w))
      .slice(0, 4);

    // type ko tag mat banao agar generic hai
    const typeTag = ["article", "video", "document"].includes(type)
      ? null
      : type;

    const tags = [
      ...new Set([typeTag, ...titleWords, ...descWords].filter(Boolean)),
    ];

    return {
      tags,
      summary: fallbackSummary,
      category: type || "General",
    };
  }
};

export const runBackgroundJobs = async (item) => {
  try {
    const aiResult = await generateTagsAndSummary(
      item.title,
      item.description,
      item.type,
    );

    // ✅ ItemModel ab import hai
    await ItemModel.findByIdAndUpdate(item._id, {
      tags: aiResult.tags,
      summary: aiResult.summary,
      aiProcessed: true,
    });
  } catch (err) {
    console.error("Background job error:", err.message);
  }
};

export const generateHighlights = async (title, description, summary) => {
  try {
    const prompt = `
You are a smart content analyzer.
Extract the 3-5 most important and insightful sentences from this content.

Title: ${title}
Content: ${description || summary || "No content available"}

Return ONLY a JSON array of strings. Each string should be a complete, meaningful sentence.
Example format:
["First important insight here.", "Second key point here.", "Third notable fact here."]

Return ONLY the JSON array, no other text.
    `;

    const result = await model.invoke(prompt);
    const rawText =
      typeof result.content === "string"
        ? result.content
        : Array.isArray(result.content)
          ? result.content.map((c) => c.text ?? "").join("\n")
          : "";

    // Try to grab JSON array between first '[' and last ']'
    const start = rawText.indexOf("[");
    const end = rawText.lastIndexOf("]");

    if (start === -1 || end === -1 || end <= start) {
      throw new Error(
        `No JSON array found in LLM output: ${rawText.slice(0, 200)}...`,
      );
    }

    const cleaned = rawText.slice(start, end + 1).trim();

    let highlights;
    try {
      highlights = JSON.parse(cleaned);
    } catch (e) {
      throw new Error(
        `Failed to parse highlights JSON. Snippet: ${cleaned.slice(0, 200)}...`,
      );
    }

    return Array.isArray(highlights) ? highlights : [];
  } catch (error) {
    console.error("Highlight generation error:", error);

    // Fallback: pick first few sentences from description/summary
    const baseText = description || summary || "";
    if (!baseText) return [];

    const sentences = baseText
      .split(/(?<=[\.!\?])\s+/)
      .map((s) => s.trim())
      .filter(Boolean);

    return sentences.slice(0, 5);
  }
};
