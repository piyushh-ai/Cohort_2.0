import { ChatGroq } from "@langchain/groq";
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";
import { config } from "../config/config.js";
import ItemModel from "../models/item.model.js";

const model = new ChatGroq({
  model: "llama-3.1-8b-instant",
  apiKey: config.groqApiKey,
  temperature: 0.3,
  timeout: 10000,
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
    const prompt = await taggingPrompt.format({
      title,
      description: description || "No description available",
      type,
      format_instructions: parser.getFormatInstructions(),
    });

    const llmResult = await model.invoke(prompt);
    const rawText =
      typeof llmResult.content === "string"
        ? llmResult.content
        : Array.isArray(llmResult.content)
          ? llmResult.content.map((c) => c.text ?? "").join("\n")
          : "";

    const start = rawText.indexOf("{");
    const end = rawText.lastIndexOf("}");

    if (start === -1 || end === -1 || end <= start) {
      throw new Error(`No JSON object found in LLM output`);
    }

    const cleaned = rawText.slice(start, end + 1).trim();
    const parsed = JSON.parse(cleaned);

    const tags = Array.isArray(parsed.tags) ? parsed.tags : [];
    const summary = typeof parsed.summary === "string" ? parsed.summary : "";
    const category = typeof parsed.category === "string" ? parsed.category : "";

    return { tags, summary, category };
  } catch (error) {
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

    const titleWords = title
      .toLowerCase()
      .split(/\W+/)
      .filter((w) => w.length >= 5 && !stopWords.has(w))
      .slice(0, 3);

    const descWords = safeDescription
      .toLowerCase()
      .split(/\W+/)
      .filter((w) => w.length >= 5 && !stopWords.has(w))
      .slice(0, 4);

    const typeTag = ["article", "video", "document"].includes(type)
      ? null
      : type;
    const tags = [
      ...new Set([typeTag, ...titleWords, ...descWords].filter(Boolean)),
    ];

    return { tags, summary: fallbackSummary, category: type || "General" };
  }
};

export const runBackgroundJobs = async (item) => {
  try {
    const aiResult = await generateTagsAndSummary(
      item.title,
      item.description,
      item.type,
    );
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
    // ✅ FIX: description/summary empty hain toh bhi Groq title se generate kare
    const content = description || summary || "";
    const hasContent = content.trim().length > 20;

    const prompt = hasContent
      ? `
You are a smart content analyzer.
Extract the 3-5 most important and insightful sentences from this content.

Title: ${title}
Content: ${content}

Return ONLY a JSON array of strings. Each string should be a complete, meaningful sentence.
Example: ["First insight.", "Second key point.", "Third fact."]
Return ONLY the JSON array, no other text.
`
      : `
You are a smart content analyzer.
Based on this title, generate 3-5 insightful things a person might want to know or remember about this topic.

Title: ${title}

Return ONLY a JSON array of strings. Each string should be a complete, meaningful sentence.
Example: ["First insight.", "Second key point.", "Third fact."]
Return ONLY the JSON array, no other text.
`;

    const result = await model.invoke(prompt);
    const rawText =
      typeof result.content === "string"
        ? result.content
        : Array.isArray(result.content)
          ? result.content.map((c) => c.text ?? "").join("\n")
          : "";

    const start = rawText.indexOf("[");
    const end = rawText.lastIndexOf("]");

    if (start === -1 || end === -1 || end <= start) {
      throw new Error("No JSON array found in LLM output");
    }

    const cleaned = rawText.slice(start, end + 1).trim();
    const highlights = JSON.parse(cleaned);

    return Array.isArray(highlights) ? highlights : [];
  } catch (error) {
    console.error("Highlight generation error:", error.message);

    // Fallback — content se sentences nikalo
    const baseText = description || summary || "";
    if (!baseText) return [];

    const sentences = baseText
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 20);

    return sentences.slice(0, 5);
  }
};
