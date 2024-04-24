import express from "express";
import { protectRoute } from "../controllers/authController.js";
import {
  addSale,
  deleteSale,
  getAllSales,
  getOneSales,
  updateSales,
} from "../controllers/salesController.js";
import salesMiddleware from "../utils/salesMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protectRoute, salesMiddleware("selling"), addSale)
  .get(protectRoute, getAllSales);

router
  .route("/:id")
  .get(protectRoute, getOneSales)
  .patch(protectRoute, salesMiddleware("selling"), updateSales)
  .delete(protectRoute, deleteSale);

export default router;
