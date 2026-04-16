import { Router } from "express";
import { authenticateSeller } from "../middleware/auth.middleware.js";
import multer from "multer";
import {
  createProduct,
  getAllSellerProduct,
} from "../controllers/product.controller.js";
import { validateCreateProduct } from "../validators/product.validator.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
  },
});

const productRouter = Router();

productRouter.post(
  "/",
  upload.array("images", 7),
  authenticateSeller,
  validateCreateProduct,
  createProduct,
);

productRouter.get("/seller", authenticateSeller, getAllSellerProduct);

export default productRouter;
