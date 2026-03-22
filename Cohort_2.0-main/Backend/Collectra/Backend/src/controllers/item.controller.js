import {
  createItemFromUrl,
  createItemFromFile,
  saveItem,
  fetchAllItems,
  fetchItemById,
  updateItemById,
  deleteItemById,
  toggleItemFavorite,
  addItemHighlight,
  deleteItemHighlight,
  moveItemToCollection,
  removeItemFromCollection,
  fetchRelatedItems,
  fetchResurfaceItems,
} from "../services/Item.search.service.js";

import {
  buildGraphData,
  searchItemsSemantic,
  buildTopicClusters,
} from "../services/Item.search.service.js";

import {
  getAIHighlights,
  runBackfillEmbeddings,
  retagAllItems,
} from "../services/item.ai.service.js";

// ─── Create ───────────────────────────────────────────
export const createItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { url, collectionId } = req.body;
    const file = req.file;

    let itemData;
    if (file) {
      itemData = await createItemFromFile(userId, file, collectionId);
    } else if (url) {
      itemData = await createItemFromUrl(userId, url, collectionId);
    } else {
      return res
        .status(400)
        .json({ success: false, message: "URL or file is required" });
    }

    const item = await saveItem(itemData);
    return res.status(201).json({ success: true, data: item });
  } catch (error) {
    console.error("createItem error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Read All ─────────────────────────────────────────
export const getAllItems = async (req, res) => {
  try {
    const { items, pagination } = await fetchAllItems(req.user._id, req.query);
    return res.status(200).json({ success: true, data: items, pagination });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Read One ─────────────────────────────────────────
export const getItemById = async (req, res) => {
  try {
    const item = await fetchItemById(req.params.id, req.user._id);
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Update ───────────────────────────────────────────
export const updateItem = async (req, res) => {
  try {
    const item = await updateItemById(req.params.id, req.user._id, req.body);
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Delete ───────────────────────────────────────────
export const deleteItem = async (req, res) => {
  try {
    const item = await deleteItemById(req.params.id, req.user._id);
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    return res
      .status(200)
      .json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Toggle Favorite ──────────────────────────────────
export const toggleFavorite = async (req, res) => {
  try {
    const item = await toggleItemFavorite(req.params.id, req.user._id);
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    return res.status(200).json({
      success: true,
      data: { isFavorite: item.isFavorite },
      message: item.isFavorite
        ? "Added to favorites"
        : "Removed from favorites",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Highlights ───────────────────────────────────────
export const addHighlight = async (req, res) => {
  try {
    const { text, note } = req.body;
    if (!text)
      return res
        .status(400)
        .json({ success: false, message: "Highlight text is required" });

    const item = await addItemHighlight(
      req.params.id,
      req.user._id,
      text,
      note,
    );
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    return res.status(200).json({ success: true, data: item.highlights });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteHighlight = async (req, res) => {
  try {
    const item = await deleteItemHighlight(
      req.params.id,
      req.user._id,
      req.params.highlightId,
    );
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    return res.status(200).json({ success: true, data: item.highlights });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Collections ──────────────────────────────────────
export const addToCollection = async (req, res) => {
  try {
    const { collectionId } = req.body;
    if (!collectionId)
      return res
        .status(400)
        .json({ success: false, message: "collectionId is required" });

    const item = await moveItemToCollection(
      req.params.id,
      req.user._id,
      collectionId,
    );
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Item or collection not found" });
    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const removeFromCollection = async (req, res) => {
  try {
    const item = await removeItemFromCollection(req.params.id, req.user._id);
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    return res
      .status(200)
      .json({
        success: true,
        message: "Item removed from collection",
        data: item,
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Related ──────────────────────────────────────────
export const getRelatedItems = async (req, res) => {
  try {
    const items = await fetchRelatedItems(req.params.id, req.user._id);
    if (!items)
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Resurface ────────────────────────────────────────
export const resurfaceItems = async (req, res) => {
  try {
    const items = await fetchResurfaceItems(req.user._id);
    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Graph ────────────────────────────────────────────
export const getGraphData = async (req, res) => {
  try {
    const data = await buildGraphData(req.user._id);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Semantic Search ──────────────────────────────────
export const semanticSearchItems = async (req, res) => {
  try {
    const { query, limit } = req.query;
    if (!query?.trim())
      return res
        .status(400)
        .json({ success: false, message: "Query is required" });

    const results = await searchItemsSemantic(
      req.user._id,
      query.trim(),
      limit,
    );
    return res
      .status(200)
      .json({ success: true, data: results, count: results.length });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Topic Clusters ───────────────────────────────────
export const getTopicClusters = async (req, res) => {
  try {
    const clusters = await buildTopicClusters(req.user._id);
    return res.status(200).json({ success: true, data: clusters });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── AI Highlights ────────────────────────────────────
export const generateAIHighlights = async (req, res) => {
  try {
    const item = await fetchItemById(req.params.id, req.user._id);
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });

    const highlights = await getAIHighlights(item);
    return res.status(200).json({ success: true, data: highlights });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Backfill Embeddings ──────────────────────────────
export const backfillEmbeddingsController = async (req, res) => {
  try {
    runBackfillEmbeddings();
    return res
      .status(200)
      .json({ success: true, message: "Backfill started in background" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Retag All ────────────────────────────────────────
export const retagAllItemsController = async (req, res) => {
  try {
    const count = await retagAllItems(req.user._id);
    return res.status(200).json({
      success: true,
      message: `Retagging ${count} items in background. Refresh topics in ~30 seconds.`,
    });
  } catch (error) {
    if (!res.headersSent) {
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};
