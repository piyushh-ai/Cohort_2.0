import { Router } from "express";
import { userMiddleware } from "../middlewares/user.middleware.js";
import {
  createCollection,
  getAllCollections,
  updateCollection,
  deleteCollection,
} from "../controllers/collection.controller.js";

const collectionRouter = Router();

/**
 * GET /api/collections
 * Returns all collections with item count
 */
collectionRouter.get("/", userMiddleware, getAllCollections);

/**
 * POST /api/collections
 * Creates a new collection
 * Body: { name, color }
 */
collectionRouter.post("/", userMiddleware, createCollection);

/**
 * PUT /api/collections/:id
 * Updates collection name or color
 */
collectionRouter.put("/:id", userMiddleware, updateCollection);

/**
 * DELETE /api/collections/:id
 * Deletes collection — items moved to uncategorized
 */
collectionRouter.delete("/:id", userMiddleware, deleteCollection);



export default collectionRouter;