import { MistralAIEmbeddings } from "@langchain/mistralai";
import { config } from "../config/config.js";
import ItemModel from "../models/item.model.js";

// ─── Mistral mistral-embed (1024 dim, cloud-based, no memory cost) ──────
// Replaces @xenova/transformers which caused OOM on Render free tier
let embeddingsModel = null;

const getEmbeddingModel = () => {
  if (embeddingsModel) return embeddingsModel;
  embeddingsModel = new MistralAIEmbeddings({
    apiKey: config.mistralApiKey,
    model: "mistral-embed",
  });
  return embeddingsModel;
};

// ─── Generate embedding vector for text ──────────────────
export const generateEmbedding = async (text) => {
  try {
    const model = getEmbeddingModel();
    const vector = await model.embedQuery(text);
    return vector; // float32[], 768 dimensions
  } catch (err) {
    console.error("❌ Embedding generation failed:", err.message);
    return null;
  }
};

// ─── Cosine similarity ────────────────────────────────────
const cosineSimilarity = (a, b) => {
  if (!a || !b || a.length !== b.length) return 0;
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
};

// ─── Semantic search ──────────────────────────────────────
export const semanticSearch = async (userId, query, limit = 10) => {
  try {
    const queryEmbedding = await generateEmbedding(query);

    // Fallback to keyword search if embedding fails
    if (!queryEmbedding) {
      console.log("⚠️ Embedding unavailable — falling back to keyword search");
      return ItemModel.find({
        userId,
        $or: [
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
          { tags: { $in: [new RegExp(query, "i")] } },
        ],
      })
        .limit(Number(limit))
        .select("-embedding")
        .lean();
    }

    const items = await ItemModel.find({
      userId,
      embedding: { $exists: true, $not: { $size: 0 } },
    })
      .select("+embedding _id title description type tags image siteName createdAt isFavorite collectionId summary")
      .lean();

    if (items.length === 0) return [];

    const results = items
      .map((item) => ({
        ...item,
        score: cosineSimilarity(queryEmbedding, item.embedding),
      }))
      .filter((item) => item.score > 0.4) // Higher threshold for 1024-dim
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(({ embedding, score, ...item }) => ({
        ...item,
        relevanceScore: Math.round(score * 100),
      }));

    return results;
  } catch (err) {
    console.error("❌ Semantic search error:", err.message);
    return [];
  }
};

// ─── Generate + save embedding for an item ────────────────
export const generateAndSaveEmbedding = async (itemId) => {
  try {
    const item = await ItemModel.findById(itemId).select(
      "title description tags summary"
    );
    if (!item) return;

    // Combine all text for rich embedding
    const text = [item.title, item.description, item.summary, item.tags?.join(", ")]
      .filter(Boolean)
      .join(". ")
      .slice(0, 2048); // Google supports longer context

    const embedding = await generateEmbedding(text);
    if (!embedding) return;

    await ItemModel.findByIdAndUpdate(itemId, { embedding });
    console.log(`✅ Embedding saved (1024-dim) for: ${item.title}`);
  } catch (err) {
    console.error("❌ Save embedding error:", err.message);
  }
};

// ─── Backfill: regenerate all embeddings (call after model migration) ──────
export const backfillEmbeddings = async (userId = null) => {
  try {
    const filter = userId 
      ? { userId, $or: [{ embedding: { $exists: false } }, { embedding: { $size: 0 } }] }
      : { $or: [{ embedding: { $exists: false } }, { embedding: { $size: 0 } }] };

    const items = await ItemModel.find(filter).select("_id title");
    console.log(`📦 Backfilling embeddings for ${items.length} items...`);

    for (const item of items) {
      await generateAndSaveEmbedding(item._id);
      await new Promise((r) => setTimeout(r, 100)); // Rate limiting
    }

    console.log("✅ Backfill complete!");
    return items.length;
  } catch (err) {
    console.error("❌ Backfill error:", err.message);
    return 0;
  }
};

// ─── Full migration: clear all old embeddings + regenerate ─────────
export const migrateEmbeddings = async () => {
  try {
    console.log("🔄 Clearing old embeddings...");
    await ItemModel.updateMany({}, { $set: { embedding: [] } });

    const items = await ItemModel.find({}).select("_id title");
    console.log(`📦 Migrating ${items.length} items to 1024-dim embeddings...`);

    for (const item of items) {
      await generateAndSaveEmbedding(item._id);
      await new Promise((r) => setTimeout(r, 150)); // Careful rate limiting
    }

    console.log("✅ Migration complete!");
    return items.length;
  } catch (err) {
    console.error("❌ Migration error:", err.message);
    throw err;
  }
};
