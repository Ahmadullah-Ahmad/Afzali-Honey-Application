import express from "express";
import { protectRoute } from "../controllers/authController.js";
import {
  addPurchase,
  getOnePurchase,
  updatePuchase,
  getAllPurchase,
  deletePurchase,
} from "../controllers/purchaseController.js";
import purchaseMiddleware from "../utils/purchaseMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protectRoute, purchaseMiddleware(), addPurchase)
  .get(protectRoute, getAllPurchase);

router
  .route("/:id")
  .get(protectRoute, getOnePurchase)
  .patch(protectRoute, purchaseMiddleware(), updatePuchase)
  .delete(protectRoute, deletePurchase);

export default router;
