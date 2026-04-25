import porductModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export const createProduct = async (req, res) => {

  const { title, description, priceAmount, priceCurrency } = req.body;
  const seller = req.user;

  const images = await Promise.all(
    req.files.map(async (file) => {
      return await uploadFile({
        buffer: file.buffer,
        fileName: file.originalname,
      });
    }),
  );

  const product = await porductModel.create({
    title,
    description,
    price: {
      amount: priceAmount,
      currency: priceCurrency,
    },
    images,
    seller: seller._id,
  });

  res.status(201).json({
    message: "Product Created Successfully",
    success: true,
    product,
  });
};

export const getAllSellerProduct = async (req, res) => {
  const seller = req.user;

  const products = await porductModel.find({ seller: seller._id });

  return res.status(200).json({
    message: "All Seller products fetched successfully",
    success: true,
    products,
  });
};

export const getAllProduct = async (req, res) => {

  const products = await porductModel.find();

  return res.status(200).json({
    message: "All products fetched successfully",
    success: true,
    products,
  });
};

export const getProduct = async (req, res) => {
  const { id } = req.params;

  const product = await porductModel.findById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
      success: false,
    });
  }

  return res.status(200).json({
    message: "Product fetched successfully",
    success: true,
    product,
  });
};
