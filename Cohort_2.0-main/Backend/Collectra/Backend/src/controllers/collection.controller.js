import CollectionModel from "../models/collection.model.js";
import ItemModel from "../models/item.model.js";

/**
 * Creates a new collection for the logged-in user
 * Body: { name, color }
 */
export const createCollection = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, color } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Collection name is required",
      });
    }

    // Check if collection with same name already exists
    const existing = await CollectionModel.findOne({ userId, name });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Collection with this name already exists",
      });
    }

    const collection = await CollectionModel.create({
      userId,
      name,
      color: color || "#6366f1",
    });

    return res.status(201).json({ success: true, data: collection });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Returns all collections for the logged-in user
 * Also returns item count for each collection
 */
export const getAllCollections = async (req, res) => {
  try {
    const userId = req.user._id;

    const collections = await CollectionModel.find({ userId })
      .sort({ createdAt: -1 });

    // Get item count for each collection
    const collectionsWithCount = await Promise.all(
      collections.map(async (col) => {
        const itemCount = await ItemModel.countDocuments({
          userId,
          collectionId: col._id,
        });
        return { ...col.toObject(), itemCount };
      })
    );

    return res.status(200).json({
      success: true,
      data: collectionsWithCount,
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Updates a collection name or color
 * Body: { name, color }
 */
export const updateCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const { name, color } = req.body;

    const collection = await CollectionModel.findOneAndUpdate(
      { _id: id, userId },
      { name, color },
      { new: true }
    );

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    return res.status(200).json({ success: true, data: collection });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * Deletes a collection
 * Items inside are NOT deleted — their collectionId is set to null
 */
export const deleteCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const collection = await CollectionModel.findOne({ _id: id, userId });

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    // Items delete nahi honge — bas unka collectionId null ho jaayega
    await ItemModel.updateMany(
      { userId, collectionId: id },
      { collectionId: null }
    );

    await CollectionModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Collection deleted — items moved to uncategorized",
    });

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
