import ItemModel from "../models/item.model.js";
import CollectionModel from "../models/collection.model.js";
import { scrapeLink } from "./scraper.service.js";
import {
  extractFileContent,
  getFilePreviewImage,
} from "./fileReader.service.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "./cloudinary.service.js";
import { runBackgroundJobs } from "./ai.service.js";
import { generateAndSaveEmbedding } from "./Embedding.service.js";
import mongoose from "mongoose";

// ─── Create item from URL ─────────────────────────────
export const createItemFromUrl = async (userId, url, collectionId) => {
  const scraped = await scrapeLink(url);
  return {
    userId,
    url,
    title: scraped.title,
    description: scraped.description || "",
    image: scraped.image || "",
    siteName: scraped.siteName || "",
    type: scraped.type,
    isFile: false,
    collectionId: collectionId || null,
    tags: [],
    summary: "",
  };
};

// ─── Create item from file upload ────────────────────
export const createItemFromFile = async (userId, file, collectionId) => {
  const extracted = await extractFileContent(
    file.buffer,
    file.mimetype,
    file.originalname,
  );
  const uploadResult = await uploadToCloudinary(
    file.buffer,
    file.mimetype,
    file.originalname,
  );
  const previewImage = getFilePreviewImage(
    file.mimetype,
    uploadResult.secure_url,
  );

  return {
    userId,
    url: uploadResult.secure_url,
    title: extracted.title,
    description: extracted.description || "",
    image: previewImage || "",
    type: extracted.type,
    isFile: true,
    mimeType: file.mimetype,
    fileSize: file.size,
    collectionId: collectionId || null,
    tags: [],
    summary: "",
  };
};

// ─── Save item + trigger background jobs ─────────────
// ✅ Yeh karo — AI ko bhi await karo
export const saveItem = async (itemData) => {
  const item = await ItemModel.create(itemData);

  // ✅ Embedding bilkul mat karo production par — bahut slow hai
  // ✅ Sirf AI tagging await karo — Groq fast hai (2-3 sec)
  await runBackgroundJobs(item).catch((err) =>
    console.error("runBackgroundJobs:", err.message),
  );

  // Embedding fire-and-forget — slow hai, await mat karo
  generateAndSaveEmbedding(item._id).catch((err) =>
    console.error("Embedding error:", err.message),
  );

  return item;
};

// ─── Get all items with filters ──────────────────────
export const fetchAllItems = async (userId, query) => {
  const {
    search,
    type,
    collectionId,
    isFavorite,
    tags,
    page = 1,
    limit = 20,
    sortBy = "createdAt",
    order = "desc",
  } = query;

  const filter = { userId };

  if (type) filter.type = type;
  if (collectionId) filter.collectionId = collectionId;
  if (isFavorite === "true") filter.isFavorite = true;

  if (tags) {
    const tagArray = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    filter.tags = { $in: tagArray.map((t) => new RegExp(`^${t}$`, "i")) };
  }

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { tags: { $in: [new RegExp(search, "i")] } },
      { siteName: { $regex: search, $options: "i" } },
    ];
  }

  const sortOrder = order === "asc" ? 1 : -1;
  const pageNum = Math.max(1, Number(page));
  const limitNum = Math.min(50, Math.max(1, Number(limit)));
  const skip = (pageNum - 1) * limitNum;

  const [items, total] = await Promise.all([
    ItemModel.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limitNum)
      .select("-embedding")
      .lean(),
    ItemModel.countDocuments(filter),
  ]);

  return {
    items,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
      hasNextPage: pageNum < Math.ceil(total / limitNum),
      hasPrevPage: pageNum > 1,
    },
  };
};

// ─── Get single item + increment view ────────────────
export const fetchItemById = async (id, userId) => {
  const item = await ItemModel.findOne({ _id: id, userId }).select(
    "-embedding",
  );
  if (!item) return null;

  // View count update — fire and forget
  ItemModel.findByIdAndUpdate(id, {
    $inc: { viewCount: 1 },
    lastViewedAt: new Date(),
  }).exec();

  return item;
};

// ─── Update item ──────────────────────────────────────
export const updateItemById = async (id, userId, data) => {
  const allowedFields = [
    "title",
    "description",
    "tags",
    "collectionId",
    "summary",
  ];
  const updateData = {};
  allowedFields.forEach((field) => {
    if (data[field] !== undefined) updateData[field] = data[field];
  });

  return ItemModel.findOneAndUpdate({ _id: id, userId }, updateData, {
    new: true,
    select: "-embedding",
  });
};

// ─── Delete item + Cloudinary cleanup ────────────────
export const deleteItemById = async (id, userId) => {
  const item = await ItemModel.findOne({ _id: id, userId });
  if (!item) return null;

  if (item.isFile && item.url) {
    await deleteFromCloudinary(item.url, item.mimeType);
  }

  await ItemModel.findByIdAndDelete(id);
  return item;
};

// ─── Toggle favorite ──────────────────────────────────
export const toggleItemFavorite = async (id, userId) => {
  const item = await ItemModel.findOne({ _id: id, userId });
  if (!item) return null;
  item.isFavorite = !item.isFavorite;
  await item.save();
  return item;
};

// ─── Highlights ───────────────────────────────────────
export const addItemHighlight = async (id, userId, text, note) => {
  return ItemModel.findOneAndUpdate(
    { _id: id, userId },
    { $push: { highlights: { text, note: note || "" } } },
    { new: true, select: "-embedding" },
  );
};

export const deleteItemHighlight = async (id, userId, highlightId) => {
  return ItemModel.findOneAndUpdate(
    { _id: id, userId },
    { $pull: { highlights: { _id: highlightId } } },
    { new: true, select: "-embedding" },
  );
};

// ─── Collections ──────────────────────────────────────
export const moveItemToCollection = async (id, userId, collectionId) => {
  // Verify collection belongs to user
  const collection = await CollectionModel.findOne({
    _id: collectionId,
    userId,
  });
  if (!collection) return null;

  return ItemModel.findOneAndUpdate(
    { _id: id, userId },
    { collectionId },
    { new: true, select: "-embedding" },
  );
};

export const removeItemFromCollection = async (id, userId) => {
  return ItemModel.findOneAndUpdate(
    { _id: id, userId },
    { collectionId: null },
    { new: true, select: "-embedding" },
  );
};

// ─── Related items ────────────────────────────────────
export const fetchRelatedItems = async (id, userId) => {
  const item = await ItemModel.findOne({ _id: id, userId });
  if (!item) return null;

  return ItemModel.find({
    userId,
    _id: { $ne: id },
    tags: { $in: item.tags },
  })
    .limit(5)
    .select("-embedding");
};

// ─── Resurface items ──────────────────────────────────
export const fetchResurfaceItems = async (userId) => {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const items = await ItemModel.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
        createdAt: { $lt: sevenDaysAgo },
        $or: [{ lastSurfaced: null }, { lastSurfaced: { $lt: sevenDaysAgo } }],
      },
    },
    { $sample: { size: 3 } },
    { $project: { embedding: 0 } },
  ]);

  if (items.length > 0) {
    await ItemModel.updateMany(
      { _id: { $in: items.map((i) => i._id) } },
      { lastSurfaced: new Date() },
    );
  }

  return items;
};
