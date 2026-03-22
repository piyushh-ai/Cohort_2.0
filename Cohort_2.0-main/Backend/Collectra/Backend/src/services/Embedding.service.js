import { pipeline } from "@xenova/transformers";
import ItemModel from "../models/item.model.js";

// ── Model singleton — ek baar load hoga, cache rahega ──
let embedder = null;

const getEmbedder = async () => {
  if (!embedder) {
    console.log("Loading embedding model (first time ~30s)...");
    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
    console.log("Embedding model ready!");
  }
  return embedder;
};

// ── Text ko vector mein convert karo ──────────────────
export const generateEmbedding = async (text) => {
  try {
    const model = await getEmbedder();
    const output = await model(text, { pooling: "mean", normalize: true });
    return Array.from(output.data); // 384-dimension vector
  } catch (err) {
    console.error("Embedding generation failed:", err.message);
    return null;
  }
};

// ── Cosine similarity calculate karo ─────────────────
const cosineSimilarity = (a, b) => {
  if (!a || !b || a.length !== b.length) return 0;
  let dot = 0,
    normA = 0,
    normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
};

// ── Semantic search ───────────────────────────────────
export const semanticSearch = async (userId, query, limit = 10) => {
  try {
    // Query ka embedding banao
    console.log("Semantic search called:", query); // ← add karo

    const queryEmbedding = await generateEmbedding(query);
    console.log("Query embedding length:", queryEmbedding?.length);
    if (!queryEmbedding) throw new Error("Failed to generate query embedding");

    // Sirf woh items lo jinmein embedding hai
    // ✅ Yeh karo
    const items = await ItemModel.find({
      userId,
      embedding: { $exists: true, $not: { $size: 0 } },
    })
      .select(
        "+embedding _id title description type tags image siteName createdAt isFavorite collectionId",
      )
      .lean();

    // ← Debug ke liye add karo
    console.log("Items found:", items.length);
    console.log("First item embedding:", items[0]?.embedding?.length);
    console.log("First item:", items[0]?.title);
    if (items.length === 0) return [];

    // Har item ke saath similarity calculate karo
    const results = items
      .map((item) => ({
        ...item,
        score: cosineSimilarity(queryEmbedding, item.embedding),
      }))
      .filter((item) => item.score > 0.1) // threshold — 0.3 se kam = irrelevant
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(({ embedding, score, ...item }) => ({
        ...item,
        score: Math.round(score * 100),
      })); // embedding hide karo, score % mein

    return results;
  } catch (err) {
    console.error("Semantic search error:", err.message);
    return [];
  }
};

// ── Item ka embedding generate karke save karo ───────
export const generateAndSaveEmbedding = async (itemId) => {
  try {
    const item = await ItemModel.findById(itemId).select(
      "title description tags summary",
    );
    if (!item) return;

    // Title + description + tags = rich text for embedding
    const text = [
      item.title,
      item.description,
      item.summary,
      item.tags?.join(", "),
    ]
      .filter(Boolean)
      .join(". ")
      .slice(0, 512); // model ka max input

    const embedding = await generateEmbedding(text);
    if (!embedding) return;

    await ItemModel.findByIdAndUpdate(itemId, { embedding });
    console.log("Embedding saved for:", item.title);
  } catch (err) {
    console.error("Save embedding error:", err.message);
  }
};

// ── Existing items ke liye batch embeddings ───────────
// Ek baar chalao — purane items ko bhi semantic search mein lao
export const backfillEmbeddings = async () => {
  try {
    const items = await ItemModel.find({
      $or: [{ embedding: { $exists: false } }, { embedding: { $size: 0 } }],
    }).select("_id title");

    console.log(`Backfilling embeddings for ${items.length} items...`);

    for (const item of items) {
      await generateAndSaveEmbedding(item._id);
      // Small delay to avoid overloading
      await new Promise((r) => setTimeout(r, 100));
    }

    console.log("Backfill complete!");
  } catch (err) {
    console.error("Backfill error:", err.message);
  }
};
