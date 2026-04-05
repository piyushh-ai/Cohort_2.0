import { upload } from "../middlewares/upload.middleware.js";
import { userMiddleware } from "../middlewares/user.middleware.js";
import {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  toggleFavorite,
  addHighlight,
  deleteHighlight,
  resurfaceItems,
  getRelatedItems,
  generateAIHighlights,
  removeFromCollection,
  addToCollection,
  getGraphData,
  semanticSearchItems,
  backfillEmbeddingsController,
  getTopicClusters,
  retagAllItemsController,
  chatController,
  getItemInsightController,
  migrateEmbeddingsController,
  triggerResurfaceController,
  getInsightsController,
} from "../controllers/item.controller.js";
import { Router } from "express";
import rateLimit from "express-rate-limit";

const itemRouter = Router();

// ─── Rate limiters ────────────────────────────────────────
const chatLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  message: { success: false, message: "Too many chat requests — please wait a minute" },
  standardHeaders: true,
  legacyHeaders: false,
});

const searchLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { success: false, message: "Too many search requests" },
});

const createLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { success: false, message: "Too many items being created — slow down" },
});

// ─── Admin/Test routes ────────────────────────────────────
itemRouter.post("/admin/trigger-resurface", userMiddleware, triggerResurfaceController);
itemRouter.post("/admin/migrate-embeddings", userMiddleware, migrateEmbeddingsController);

// ─── Graph ────────────────────────────────────────────────
itemRouter.get("/graph", userMiddleware, getGraphData);

// ─── Resurface ────────────────────────────────────────────
itemRouter.get("/resurface", userMiddleware, resurfaceItems);

// ─── RAG Chat (NEW) ───────────────────────────────────────
// POST /api/items/chat — Ask your collection a question
itemRouter.post("/chat", userMiddleware, chatLimiter, chatController);

// ─── Semantic search ──────────────────────────────────────
itemRouter.get("/semantic-search", userMiddleware, searchLimiter, semanticSearchItems);

// ─── Topics ───────────────────────────────────────────────
itemRouter.get("/topics", userMiddleware, getTopicClusters);

// ─── Backfill embeddings ──────────────────────────────────
itemRouter.post("/backfill-embeddings", userMiddleware, backfillEmbeddingsController);

// ─── Retag all ────────────────────────────────────────────
itemRouter.post("/retag-all", userMiddleware, retagAllItemsController);

// ─── Insights / Analytics ─────────────────────────────────
itemRouter.get("/insights", userMiddleware, getInsightsController);

// ─── CRUD ─────────────────────────────────────────────────
itemRouter.get("/", userMiddleware, getAllItems);
itemRouter.post("/", userMiddleware, createLimiter, upload.single("file"), createItem);
itemRouter.get("/:id", userMiddleware, getItemById);
itemRouter.put("/:id", userMiddleware, updateItem);
itemRouter.delete("/:id", userMiddleware, deleteItem);

// ─── Favorites ────────────────────────────────────────────
itemRouter.patch("/:id/favorite", userMiddleware, toggleFavorite);

// ─── Highlights ───────────────────────────────────────────
itemRouter.post("/:id/highlight", userMiddleware, addHighlight);
itemRouter.delete("/:id/highlight/:highlightId", userMiddleware, deleteHighlight);
itemRouter.get("/:id/highlights/generate", userMiddleware, generateAIHighlights);

// ─── Item Insight (NEW) ───────────────────────────────────
// GET /api/items/:id/insight — Deep AI analysis of a single item
itemRouter.get("/:id/insight", userMiddleware, getItemInsightController);

// ─── Related ──────────────────────────────────────────────
itemRouter.get("/:id/related", userMiddleware, getRelatedItems);

// ─── Collection management ────────────────────────────────
itemRouter.patch("/:id/collection", userMiddleware, removeFromCollection);
itemRouter.patch("/:id/add-to-collection", userMiddleware, addToCollection);

export default itemRouter;
