import ItemModel from "../models/item.model.js";
import { generateTagsAndSummary, generateHighlights } from "./ai.service.js";
import { backfillEmbeddings } from "./Embedding.service.js";

// ─── Generate AI highlights for an item ──────────────
export const getAIHighlights = async (item) => {
  return generateHighlights(item.title, item.description, item.summary);
};

// ─── Backfill embeddings for items without them ──────
export const runBackfillEmbeddings = async () => {
  backfillEmbeddings(); // fire and forget
};

// ─── Retag all items for a user ───────────────────────
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
          item.type,
        );

        await ItemModel.findByIdAndUpdate(item._id, {
          tags: result.tags,
          summary: result.summary,
          aiProcessed: true,
        });

        done++;
        console.log(`Retagged [${done}/${items.length}]: ${item.title}`);
        await new Promise((r) => setTimeout(r, 500));
      } catch (err) {
        console.error(`Retag failed for ${item.title}:`, err.message);
      }
    }
    console.log(`✅ Retag complete: ${done}/${items.length}`);
  })();

  return items.length;
};
