import ItemModel from "../models/item.model.js";
import { semanticSearch } from "./Embedding.service.js";

// ─── Knowledge graph data ─────────────────────────────
export const buildGraphData = async (userId) => {
  const items = await ItemModel.find({
    userId,
    tags: { $exists: true, $not: { $size: 0 } },
  })
    .select("_id title type tags image")
    .lean();

  const nodes = items.map((item) => ({
    id: item._id.toString(),
    title: item.title,
    type: item.type,
    image: item.image,
    tags: item.tags,
  }));

  const edges = [];
  const seen = new Set();

  for (let i = 0; i < items.length; i++) {
    for (let j = i + 1; j < items.length; j++) {
      const sharedTags = items[i].tags.filter((t) => items[j].tags.includes(t));
      if (sharedTags.length > 0) {
        const edgeId = `${items[i]._id}-${items[j]._id}`;
        if (!seen.has(edgeId)) {
          seen.add(edgeId);
          edges.push({
            source: items[i]._id.toString(),
            target: items[j]._id.toString(),
            sharedTags,
            strength: sharedTags.length,
          });
        }
      }
    }
  }

  return { nodes, edges };
};

// ─── Semantic search ──────────────────────────────────
export const searchItemsSemantic = async (userId, query, limit = 10) => {
  return semanticSearch(userId, query, Number(limit));
};

// ─── Topic clusters ───────────────────────────────────
const IGNORE_TAGS = new Set([
  "video",
  "article",
  "pdf",
  "image",
  "tweet",
  "document",
  "post",
  "page",
  "content",
  "media",
  "text",
  "file",
  "song",
  "music video",
  "reel",
  "short",
  "clip",
  "photo",
  "subscribe",
  "watch",
  "click",
  "like",
  "share",
  "comment",
  "download",
  "learn",
  "read",
  "build",
  "make",
  "create",
  "use",
  "using",
  "install",
  "setup",
  "start",
  "begin",
  "presenting",
  "presented",
  "official",
  "full",
  "new",
  "best",
  "top",
  "latest",
  "free",
  "online",
  "general",
  "untitled",
  "good",
  "great",
  "easy",
  "simple",
  "fast",
  "quick",
  "complete",
  "basic",
  "advanced",
  "beginner",
  "amazing",
  "awesome",
  "must",
  "overview",
  "introduction",
  "intro",
  "summary",
  "update",
  "review",
  "course",
  "series",
  "part",
  "episode",
  "example",
  "demo",
  "project",
  "app",
  "tool",
  "resource",
  "never",
  "meant",
  "great",
  "playing",
  "built",
  "track",
  "breezy",
  "waves",
  "captures",
  "youtube",
  "instagram",
  "twitter",
  "facebook",
  "reddit",
  "github",
  "google",
  "web",
  "internet",
  "platform",
  "programming",
  "coding",
  "software",
  "technology",
  "tech",
  "computer",
  "hello",
  "world",
  "notes",
  "understanding",
  "something",
  "really",
  "shipped",
]);

// ─── Tag normalization — similar tags ko ek group mein lao ────
// "bollywood music" aur "bollywood" → dono "bollywood" bucket mein
const normalizeTag = (rawTag) => {
  return rawTag
    .toLowerCase()
    .trim()
    .replace(/[-_]/g, " ") // hyphens/underscores → space
    .replace(/\s+/g, " ") // multiple spaces → single
    .replace(/[^\w\s]/g, "") // special chars hata do
    .trim();
};

// ─── Check if two tags are similar enough to merge ──────────
// "bollywood music" contains "bollywood" → merge into shorter one
const getCanonicalTag = (tag, allTags) => {
  // Agar koi shorter tag hai jo is tag ka substring hai → use that
  for (const other of allTags) {
    if (other !== tag && tag.includes(other) && other.length >= 4) {
      return other; // shorter canonical form
    }
  }
  return tag;
};

export const buildTopicClusters = async (userId) => {
  const items = await ItemModel.find({
    userId,
    "tags.0": { $exists: true },
  })
    .select("_id title type tags image")
    .lean();

  if (items.length === 0) return [];

  // ─── Step 1: Collect all valid normalized tags ────────────
  const rawTagCount = {};

  items.forEach((item) => {
    const seenForThisItem = new Set();

    item.tags.forEach((rawTag) => {
      const normalized = normalizeTag(rawTag);

      if (seenForThisItem.has(normalized)) return;
      seenForThisItem.add(normalized);

      // Filter junk
      if (
        normalized.length < 3 ||
        normalized.length > 20 ||
        IGNORE_TAGS.has(normalized) ||
        /^\d+$/.test(normalized) ||
        /^[^a-z]+$/.test(normalized) ||
        normalized.split(" ").length > 3
      )
        return;

      if (!rawTagCount[normalized]) {
        rawTagCount[normalized] = { tag: normalized, itemSet: new Set() };
      }
      rawTagCount[normalized].itemSet.add(item._id.toString());
    });
  });

  // ─── Step 2: Merge similar tags ──────────────────────────
  // "bollywood music" → "bollywood" (shorter canonical form)
  const allValidTags = Object.keys(rawTagCount);
  const mergedTagCount = {};

  Object.entries(rawTagCount).forEach(([tag, data]) => {
    const canonical = getCanonicalTag(tag, allValidTags);

    if (!mergedTagCount[canonical]) {
      mergedTagCount[canonical] = { tag: canonical, itemSet: new Set() };
    }
    // Merge item sets
    data.itemSet.forEach((id) => mergedTagCount[canonical].itemSet.add(id));
  });

  // ─── Step 3: Build itemMap ───────────────────────────────
  const itemMap = {};
  items.forEach((item) => {
    itemMap[item._id.toString()] = item;
  });

  // ─── Step 4: Filter, sort, return ───────────────────────
  // count >= 2: sirf woh topics jo 2+ items share karte hain
  // Isse single-item noise filter hoti hai
  // Naye users ke liye (< 10 items): count >= 1
  const minCount = items.length <= 10 ? 1 : 2;

  return Object.values(mergedTagCount)
    .map((c) => ({
      tag: c.tag,
      count: c.itemSet.size,
      itemIds: [...c.itemSet],
    }))
    .filter((c) => c.count >= minCount)
    .sort((a, b) => b.count - a.count)
    .slice(0, 12)
    .map((c) => ({
      topic: c.tag,
      originalTag: c.tag,
      count: c.count,
      items: c.itemIds
        .slice(0, 4)
        .map((id) => itemMap[id])
        .filter(Boolean),
    }));
};
