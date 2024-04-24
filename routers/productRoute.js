import express from "express";
import { protectRoute } from "../controllers/authController.js";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  getCompleteProduct,
  getOneProduct,
  resizeProductPhoto,
  updateProduct,
  uploadProductPhoto,
} from "../controllers/productController.js";

const router = express.Router();

router.use(protectRoute);
router.get("/complete", getCompleteProduct);
router
  .route("/")
  .post(uploadProductPhoto, resizeProductPhoto, addProduct)
  .get(getAllProduct);

router
  .route("/:id")
  .get(getOneProduct)
  .patch(uploadProductPhoto, resizeProductPhoto, updateProduct)
  .delete(deleteProduct);

export default router;
