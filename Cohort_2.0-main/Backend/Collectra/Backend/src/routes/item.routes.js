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
} from "../controllers/item.controller.js";
import { Router } from "express";

const itemRouter = Router();

// Graph data — /resurface se pehle daalo
itemRouter.get("/graph", userMiddleware, getGraphData);

/**
 * GET /api/items/resurface
 * Returns 3 random items that haven't been viewed in 7+ days
 * Must be defined before /:id to avoid route conflict
 */
itemRouter.get("/resurface", userMiddleware, resurfaceItems);

/**
 * GET /api/items/semantic-search
 * Semantic search using embeddings
 * Query params: query, limit
 */
itemRouter.get("/semantic-search", userMiddleware, semanticSearchItems);
itemRouter.get("/topics", userMiddleware, getTopicClusters);

/**
 * POST /api/items/backfill-embeddings
 * Ek baar chalao — purane items mein embeddings add karo
 */
itemRouter.post(
  "/backfill-embeddings",
  userMiddleware,
  backfillEmbeddingsController,
);

/**
 * POST /api/items/retag-all
 * Purane items ko AI se dobara retag karo
 * Background mein chalega — turant response milega
 */
itemRouter.post("/retag-all", userMiddleware, retagAllItemsController);

/**
 * GET /api/items
 * Returns all items for the logged-in user
 * Query params:
 *   - search: string (searches title, description, tags)
 *   - type: article | video | pdf | image | tweet | document
 *   - collectionId: string
 *   - isFavorite: true
 *   - tags: comma separated (e.g. AI,React)
 *   - page: number (default 1)
 *   - limit: number (default 20, max 50)
 *   - sortBy: createdAt | title | viewCount (default createdAt)
 *   - order: asc | desc (default desc)
 */
itemRouter.get("/", userMiddleware, getAllItems);

/**
 * POST /api/items
 * Creates a new item
 * Body: { url } or multipart form with file
 * Optional body: { collectionId }
 */
itemRouter.post("/", userMiddleware, upload.single("file"), createItem);

/**
 * GET /api/items/:id
 * Returns a single item by ID
 * Also increments viewCount
 */
itemRouter.get("/:id", userMiddleware, getItemById);

/**
 * PUT /api/items/:id
 * Updates an item
 * Allowed fields: title, description, tags, collectionId, summary
 */
itemRouter.put("/:id", userMiddleware, updateItem);

/**
 * DELETE /api/items/:id
 * Deletes an item from MongoDB
 * Also deletes the file from Cloudinary if it was a file upload
 */
itemRouter.delete("/:id", userMiddleware, deleteItem);

/**
 * PATCH /api/items/:id/favorite
 * Toggles isFavorite field on an item
 */
itemRouter.patch("/:id/favorite", userMiddleware, toggleFavorite);

/**
 * POST /api/items/:id/highlight
 * Adds a highlight to an item
 * Body: { text: string, note?: string }
 */
itemRouter.post("/:id/highlight", userMiddleware, addHighlight);

/**
 * DELETE /api/items/:id/highlight/:highlightId
 * Removes a specific highlight from an item
 */
itemRouter.delete(
  "/:id/highlight/:highlightId",
  userMiddleware,
  deleteHighlight,
);

/**
 * GET /api/items/:id/related
 * Returns up to 5 items that share tags with the given item
 */
itemRouter.get("/:id/related", userMiddleware, getRelatedItems);

/**
 * GET /api/items/:id/highlights/generate
 * Uses AI to extract key highlights from item content
 * Returns array of suggested highlight strings
 * User then selects which to save via POST /:id/highlight
 */
itemRouter.get(
  "/:id/highlights/generate",
  userMiddleware,
  generateAIHighlights,
);

/**
 * PATCH /api/items/:id/collection
 * Removes item from its current collection
 */
itemRouter.patch("/:id/collection", userMiddleware, removeFromCollection);

/**
 * PATCH /api/items/:id/add-to-collection
 * Adds item to a collection or moves it to another collection
 * Body: { collectionId }
 */
itemRouter.patch("/:id/add-to-collection", userMiddleware, addToCollection);

export default itemRouter;
