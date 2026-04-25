import mongoose from "mongoose";
import priceSchema from "./price.schema.js";

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
      type:priceSchema,
      required: true, 
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
    stock: {
      type: Number,
      required: true,
      default: 0,
    },
    variants: [
      {
        images: [
          {
            url: {
              type: String,
              required: true,
            },
          },
        ],
        attributes: {
          type: Map,
          of: String,
        },
        stock: {
          type: Number,
          required: true,
          default: 0,
        },
        price: {
          type:priceSchema,
          required: true, 
        },
      },
    ],
  },
  { timestamps: true },
);

const productModel = mongoose.model("products", productSchema);

export default productModel;
