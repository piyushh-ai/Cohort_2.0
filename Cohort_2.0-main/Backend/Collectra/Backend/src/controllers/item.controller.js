import { scrapeLink } from "../services/scraper.service.js";
import {
  extractFileContent,
  getFilePreviewImage,
} from "../services/fileReader.service.js";
import ItemModel from "../models/item.model.js";
import cloudinary from "../config/cloudinary.js";
import {
  generateHighlights,
  runBackgroundJobs,
} from "../services/ai.service.js";
import CollectionModel from "../models/collection.model.js";

// ─── Cloudinary upload options ────────────────────────────
const getUploadOptions = (mimetype, originalname) => {
  const publicId = `${Date.now()}-${originalname.split(".")[0]}`;

  if (mimetype.startsWith("image/")) {
    return {
      folder: "collectra/images",
      resource_type: "image",
      public_id: publicId,
    };
  }

  // ✅ PDF ko image resource type pe upload karo — tab Cloudinary thumbnail banega
  if (mimetype === "application/pdf") {
    return {
      folder: "collectra/pdfs",
      resource_type: "raw", // ← YAHAN "raw" tha, "image" karo
      public_id: publicId,
    };
  }

  // Word, Excel, PPT — raw hi rahega
  return {
    folder: "collectra/docs",
    resource_type: "raw",
    public_id: publicId,
  };
};

// ─── Cloudinary resource type from mimeType ───────────────
const getResourceType = (mimeType) => {
  if (!mimeType) return "raw";
  if (mimeType.startsWith("image/")) return "image";
  if (mimeType === "application/pdf") return "raw"; // ← ye add karo
  return "raw";
};

// ─── Public ID from Cloudinary URL ───────────────────────
const getPublicIdFromUrl = (url, mimeType) => {
  try {
    const resourceType = getResourceType(mimeType);
    const marker = `/${resourceType}/upload/`;
    const urlParts = url.split(marker);
    if (urlParts.length < 2) return null;
    // Version prefix hatao (v1234567890/)
    return urlParts[1].replace(/^v\d+\//, "");
  } catch {
    return null;
  }
};

export const createItem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { url, collectionId } = req.body;
    const file = req.file;

    let itemData = {};

    if (file) {
      // Step 1 — Buffer se content nikalo
      const extracted = await extractFileContent(
        file.buffer,
        file.mimetype,
        file.originalname,
      );

      // Step 2 — Cloudinary pe upload
      const uploadResult = await new Promise((resolve, reject) => {
        const options = getUploadOptions(file.mimetype, file.originalname);
        const stream = cloudinary.uploader.upload_stream(
          options,
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );
        stream.end(file.buffer);
      });

      // Step 3 — Preview image
      const previewImage = getFilePreviewImage(
        file.mimetype,
        uploadResult.secure_url,
      );

      itemData = {
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
    } else if (url) {
      const scraped = await scrapeLink(url);
      itemData = {
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
    } else {
      return res.status(400).json({
        success: false,
        message: "URL or file is required",
      });
    }

    const item = await ItemModel.create(itemData);
    res.status(201).json({ success: true, data: item });

    // Background mein AI chalao
    runBackgroundJobs(item);
  } catch (error) {
    console.error("createItem error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const getAllItems = async (req, res) => {
  try {
    const userId = req.user._id;
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
    } = req.query;

    const filter = { userId };

    if (type) filter.type = type;
    if (collectionId) filter.collectionId = collectionId;
    if (isFavorite === "true") filter.isFavorite = true;

    if (tags) {
      const tagArray = tags.split(",").map((t) => t.trim());
      filter.tags = { $in: tagArray };
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

    return res.status(200).json({
      success: true,
      data: items,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
        hasNextPage: pageNum < Math.ceil(total / limitNum),
        hasPrevPage: pageNum > 1,
      },
    });
  } catch (error) {
    console.error("getAllItems error:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

export const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const item = await ItemModel.findOne({ _id: id, userId }).select(
      "-embedding",
    );

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    ItemModel.findByIdAndUpdate(id, {
      $inc: { viewCount: 1 },
      lastViewedAt: new Date(),
    }).exec();

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const allowedFields = [
      "title",
      "description",
      "tags",
      "collectionId",
      "summary",
    ];
    const updateData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    const item = await ItemModel.findOneAndUpdate(
      { _id: id, userId },
      updateData,
      { new: true, select: "-embedding" },
    );

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    return res.status(200).json({ success: true, data: item });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const item = await ItemModel.findOne({ _id: id, userId });

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    // ✅ Cloudinary se delete — sahi resource_type ke saath
    if (item.isFile && item.url) {
      try {
        const resourceType = getResourceType(item.mimeType);
        const publicId = getPublicIdFromUrl(item.url, item.mimeType);

        if (publicId) {
          await cloudinary.uploader.destroy(publicId, {
            resource_type: resourceType,
          });
          console.log("Cloudinary deleted:", publicId, "type:", resourceType);
        }
      } catch (cloudErr) {
        console.error("Cloudinary delete error:", cloudErr.message);
        // MongoDB se delete karo even if Cloudinary fails
      }
    }

    await ItemModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Item deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const toggleFavorite = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const item = await ItemModel.findOne({ _id: id, userId });

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    item.isFavorite = !item.isFavorite;
    await item.save();

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

export const addHighlight = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const { text, note } = req.body;

    if (!text) {
      return res
        .status(400)
        .json({ success: false, message: "Highlight text is required" });
    }

    const item = await ItemModel.findOneAndUpdate(
      { _id: id, userId },
      { $push: { highlights: { text, note: note || "" } } },
      { new: true, select: "-embedding" },
    );

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    return res.status(200).json({ success: true, data: item.highlights });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteHighlight = async (req, res) => {
  try {
    const { id, highlightId } = req.params;
    const userId = req.user._id;

    const item = await ItemModel.findOneAndUpdate(
      { _id: id, userId },
      { $pull: { highlights: { _id: highlightId } } },
      { new: true, select: "-embedding" },
    );

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    return res.status(200).json({ success: true, data: item.highlights });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const resurfaceItems = async (req, res) => {
  try {
    const userId = req.user._id;

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 1);

    const items = await ItemModel.aggregate([
      {
        $match: {
          userId: userId,
          createdAt: { $lt: sevenDaysAgo },
          $or: [
            { lastSurfaced: null },
            { lastSurfaced: { $lt: sevenDaysAgo } },
          ],
        },
      },
      { $sample: { size: 3 } },
      { $project: { embedding: 0 } },
    ]);

    if (items.length > 0) {
      const itemIds = items.map((item) => item._id);
      await ItemModel.updateMany(
        { _id: { $in: itemIds } },
        { lastSurfaced: new Date() },
      );
    }

    return res.status(200).json({ success: true, data: items });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getRelatedItems = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const item = await ItemModel.findOne({ _id: id, userId });

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    const relatedItems = await ItemModel.find({
      userId,
      _id: { $ne: id },
      tags: { $in: item.tags },
    })
      .limit(5)
      .select("-embedding");

    return res.status(200).json({ success: true, data: relatedItems });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const generateAIHighlights = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const item = await ItemModel.findOne({ _id: id, userId });

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    const highlights = await generateHighlights(
      item.title,
      item.description,
      item.summary,
    );

    return res.status(200).json({ success: true, data: highlights });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const removeFromCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const item = await ItemModel.findOneAndUpdate(
      { _id: id, userId },
      { collectionId: null },
      { new: true, select: "-embedding" },
    );

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Item removed from collection",
      data: item,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const addToCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const { collectionId } = req.body;

    if (!collectionId) {
      return res
        .status(400)
        .json({ success: false, message: "collectionId is required" });
    }

    const collection = await CollectionModel.findOne({
      _id: collectionId,
      userId,
    });

    if (!collection) {
      return res
        .status(404)
        .json({ success: false, message: "Collection not found" });
    }

    const item = await ItemModel.findOneAndUpdate(
      { _id: id, userId },
      { collectionId },
      { new: true, select: "-embedding" },
    );

    if (!item) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found" });
    }

    return res.status(200).json({
      success: true,
      message: `Item added to "${collection.name}"`,
      data: item,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
