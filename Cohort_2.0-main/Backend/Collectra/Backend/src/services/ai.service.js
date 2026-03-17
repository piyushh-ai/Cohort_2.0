import { ChatGroq } from "@langchain/groq";  // ← change
import { PromptTemplate } from "@langchain/core/prompts";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { z } from "zod";
import { config } from "../config/config.js";
import ItemModel from "../models/item.model.js";

const model = new ChatGroq({          // ← change
  model: "llama-3.1-8b-instant",     // fast + free
  apiKey: config.groqApiKey,         // ← change
  temperature: 0.3,
});

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    tags: z.array(z.string()).describe("4-5 short relevant tags"),
    summary: z.string().describe("2-3 line summary of the content"),
    category: z.string().describe("Single main topic category"),
  }),
);

const taggingPrompt = PromptTemplate.fromTemplate(`
You are a smart content organizer.
Analyze this saved item and return structured data.

Title: {title}
Description: {description}
Type: {type}

{format_instructions}

Return only valid JSON, nothing else.
`);

export const generateTagsAndSummary = async (title, description, type) => {
  try {
    console.log("AI tagging started for:", title);

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
      throw new Error(`No JSON object found in LLM output: ${rawText.slice(0, 200)}...`);
    }

    const cleaned = rawText.slice(start, end + 1).trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      throw new Error(`Failed to parse tagging JSON. Snippet: ${cleaned.slice(0, 200)}...`);
    }

    const tags = Array.isArray(parsed.tags) ? parsed.tags : [];
    const summary = typeof parsed.summary === "string" ? parsed.summary : "";
    const category = typeof parsed.category === "string" ? parsed.category : "";

    console.log("AI result (parsed):", { tags, summary, category });

    return { tags, summary, category };
  } catch (error) {
    console.error("AI tagging error:", error);

    // Fallback: simple heuristic tags/summary so user still gets value
    const safeDescription = description || "";
    const fallbackSummary =
      safeDescription.slice(0, 240) ||
      `Quick summary for ${title}`;

    const baseTags = [title, type]
      .filter(Boolean)
      .map((v) => String(v));

    const extraTags = safeDescription
      .split(/\W+/)
      .filter((w) => w.length > 4)
      .slice(0, 3);

    const tags = [...new Set([...baseTags, ...extraTags])];

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

    console.log("AI done:", item.title, "→", aiResult.tags);
  } catch (err) {
    console.error("Background job error:", err.message);
  }
};

export const generateHighlights = async (title, description, summary) => {
  try {
    console.log("Generating highlights for:", title);

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
      throw new Error(`No JSON array found in LLM output: ${rawText.slice(0, 200)}...`);
    }

    const cleaned = rawText.slice(start, end + 1).trim();

    let highlights;
    try {
      highlights = JSON.parse(cleaned);
    } catch (e) {
      throw new Error(`Failed to parse highlights JSON. Snippet: ${cleaned.slice(0, 200)}...`);
    }

    console.log("Highlights generated:", highlights);
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
