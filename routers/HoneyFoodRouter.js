import express from "express";
import { protectRoute } from "../controllers/authController.js";
import {
  addFood,
  deleteFood,
  getFood,
  getOneFood,
  updateFood,
} from "../controllers/foodController.js";
import FoodMiddleware from "../utils/beeSaveMiddleware.js";
const router = express.Router();
router.use(protectRoute);
router
  .route("/")
  .post(FoodMiddleware("add"), addFood)
  .get(FoodMiddleware("access"), getFood);

router
  .route("/:id")
  .get(FoodMiddleware("access"), getOneFood)
  .patch(FoodMiddleware("update"), updateFood)
  .delete(FoodMiddleware("delete"), deleteFood);

export default router;
