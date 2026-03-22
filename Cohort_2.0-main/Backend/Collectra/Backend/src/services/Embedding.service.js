import ItemModel from "../models/item.model.js";

// ── Render free tier par @xenova/transformers memory kill karta hai ──
// Isliye dynamic import + try-catch + null fallback use karo
let embedder = null;
let embedderFailed = false; // ek baar fail hua toh dobara try mat karo

const getEmbedder = async () => {
  if (embedderFailed) return null;
  if (embedder) return embedder;

  try {
    console.log("Loading embedding model...");
    const { pipeline } = await import("@xenova/transformers");
    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
    console.log("Embedding model ready!");
    return embedder;
  } catch (err) {
    console.error(
      "Embedding model failed to load — semantic search disabled:",
      err.message,
    );
    embedderFailed = true;
    return null;
  }
};

// ── Text ko vector mein convert karo ──────────────────
export const generateEmbedding = async (text) => {
  try {
    const model = await getEmbedder();
    if (!model) return null; // gracefully skip — no crash

    const output = await model(text, { pooling: "mean", normalize: true });
    return Array.from(output.data);
  } catch (err) {
    console.error("Embedding generation failed:", err.message);
    embedderFailed = true; // aage se try mat karo
    return null;
  }
};

// ── Cosine similarity ─────────────────────────────────
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
    const queryEmbedding = await generateEmbedding(query);

    // ✅ Model load nahi hua — keyword fallback use karo
    if (!queryEmbedding) {
      console.log("Embedding unavailable — falling back to keyword search");
      const items = await ItemModel.find({
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
      return items;
    }

    const items = await ItemModel.find({
      userId,
      embedding: { $exists: true, $not: { $size: 0 } },
    })
      .select(
        "+embedding _id title description type tags image siteName createdAt isFavorite collectionId",
      )
      .lean();

    if (items.length === 0) return [];

    const results = items
      .map((item) => ({
        ...item,
        score: cosineSimilarity(queryEmbedding, item.embedding),
      }))
      .filter((item) => item.score > 0.1)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(({ embedding, score, ...item }) => ({
        ...item,
        score: Math.round(score * 100),
      }));

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

    const text = [
      item.title,
      item.description,
      item.summary,
      item.tags?.join(", "),
    ]
      .filter(Boolean)
      .join(". ")
      .slice(0, 512);

    const embedding = await generateEmbedding(text);
    if (!embedding) return; // silently skip if model unavailable

    await ItemModel.findByIdAndUpdate(itemId, { embedding });
    console.log("Embedding saved for:", item.title);
  } catch (err) {
    console.error("Save embedding error:", err.message);
  }
};

// ── Backfill ──────────────────────────────────────────
export const backfillEmbeddings = async () => {
  try {
    const items = await ItemModel.find({
      $or: [{ embedding: { $exists: false } }, { embedding: { $size: 0 } }],
    }).select("_id title");

    console.log(`Backfilling embeddings for ${items.length} items...`);

    for (const item of items) {
      await generateAndSaveEmbedding(item._id);
      await new Promise((r) => setTimeout(r, 200));
    }

    console.log("Backfill complete!");
  } catch (err) {
    console.error("Backfill error:", err.message);
  }
};
