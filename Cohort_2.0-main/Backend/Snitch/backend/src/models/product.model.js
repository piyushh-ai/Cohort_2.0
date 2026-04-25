import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    seller: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    price: {
      amount: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        enum: ["USD", "EUR", "GBP", "JPY", "INR"],
        default: "INR",
      },
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

const porductModel = mongoose.model("products", productSchema);

export default porductModel;
