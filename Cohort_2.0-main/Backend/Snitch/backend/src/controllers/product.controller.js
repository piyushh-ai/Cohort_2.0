import porductModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export const createProduct = async (req, res) => {
  console.log(req.body);
console.log(req.files);
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
