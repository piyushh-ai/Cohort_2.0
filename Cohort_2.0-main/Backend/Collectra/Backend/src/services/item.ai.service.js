import ItemModel from "../models/item.model.js";
import { generateTagsAndSummary, generateHighlights, generateItemInsight } from "./ai.service.js";
import { backfillEmbeddings, migrateEmbeddings } from "./Embedding.service.js";
import { chatWithCollection } from "./rag.agent.js";

// ─── Generate AI highlights for an item ───────────────────
export const getAIHighlights = async (item) => {
  return generateHighlights(item.title, item.description, item.summary);
};

// ─── Generate deep insight for a single item ──────────────
export const getItemInsight = async (item) => {
  return generateItemInsight(item);
};

// ─── RAG Chat with collection ─────────────────────────────
export const chatWithUserCollection = async (userId, query) => {
  return chatWithCollection(userId, query);
};

// ─── Backfill embeddings for items without them ───────────
export const runBackfillEmbeddings = async (userId = null) => {
  backfillEmbeddings(userId); // fire and forget
};

// ─── Migrate all embeddings to new 768-dim model ──────────
export const runMigrateEmbeddings = async () => {
  return migrateEmbeddings();
};

// ─── Retag all items for a user ───────────────────────────
export const retagAllItems = async (userId) => {
  const items = await ItemModel.find({ userId })
    .select("_id title description summary type")
    .lean();

  if (items.length === 0) return 0;

  // Fire and forget — background mein chalega
  (async () => {
    let done = 0;
    for (const item of items) {
      try {
        const cleanTitle = item.title
          .replace(/[|#@*]/g, " ")
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 200);

        const result = await generateTagsAndSummary(
          cleanTitle,
          item.description || item.summary || "",
          item.type
        );

        await ItemModel.findByIdAndUpdate(item._id, {
          tags: result.tags,
          summary: result.summary,
          aiProcessed: true,
        });

        done++;
        console.log(`Retagged [${done}/${items.length}]: ${item.title}`);
        await new Promise((r) => setTimeout(r, 300)); // Rate limit
      } catch (err) {
        console.error(`Retag failed for ${item.title}:`, err.message);
      }
    }
    console.log(`✅ Retag complete: ${done}/${items.length}`);
  })();

  return items.length;
};
