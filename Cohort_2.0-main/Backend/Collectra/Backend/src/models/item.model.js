import mongoose from "mongoose";

const highlightSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    note: {
      type: String,
      default: "",
    },
  },
  { _id: true, timestamps: true }
);

const itemSchema = new mongoose.Schema(
  {
    // ─── Owner ──────────────────────────────────────────
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Fast query ke liye
    },

    // ─── Core Info ──────────────────────────────────────
    url: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      default: "Untitled",
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    // ─── Media ──────────────────────────────────────────
    image: {
      type: String,
      default: "",
    },

    siteName: {
      type: String,
      default: "",
    },

    // ─── Type ───────────────────────────────────────────
    type: {
      type: String,
      enum: ["article", "video", "pdf", "image", "tweet", "document"],
      default: "article",
    },

    // ─── File Info (agar user ne file upload ki hai) ────
    isFile: {
      type: Boolean,
      default: false,
    },

    fileSize: {
      type: Number, // bytes mein
      default: null,
    },

    mimeType: {
      type: String,
      default: null,
    },

    // ─── AI Generated ───────────────────────────────────
    tags: {
      type: [String],
      default: [],
      index: true, // Tag se filter karne ke liye
    },

    summary: {
      type: String,
      default: "",
    },

    aiProcessed: {
      type: Boolean,
      default: false, // AI ne process kiya ya nahi
    },

    // ─── Semantic Search ────────────────────────────────
    embedding: {
      type: [Number],
      default: [],
      select: false, // Normal queries mein mat aaye — heavy hota hai
    },

    // ─── Organization ───────────────────────────────────
    collectionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      default: null,
    },

    isFavorite: {
      type: Boolean,
      default: false,
    },

    // ─── Highlights ─────────────────────────────────────
    highlights: {
      type: [highlightSchema],
      default: [],
    },

    // ─── Resurfacing ────────────────────────────────────
    lastSurfaced: {
      type: Date,
      default: null,
    },

    viewCount: {
      type: Number,
      default: 0,
    },

    lastViewedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // createdAt aur updatedAt auto
  }
);

// ─── Indexes ──────────────────────────────────────────────
// Search fast karne ke liye
itemSchema.index({ userId: 1, createdAt: -1 });
itemSchema.index({ userId: 1, type: 1 });
itemSchema.index({ userId: 1, collectionId: 1 });
itemSchema.index({ userId: 1, isFavorite: 1 });
itemSchema.index({ title: "text", description: "text" }); // Text search

// ─── Methods ──────────────────────────────────────────────
// View count badhao
itemSchema.methods.incrementView = function () {
  this.viewCount += 1;
  this.lastViewedAt = new Date();
  return this.save();
};

const ItemModel = mongoose.model("Item", itemSchema);

export default ItemModel;