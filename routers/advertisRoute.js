import express from "express";
import {
  getAdvetisments,
  getAdvetismentOne,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAdvetisments);
router.get("/:id", getAdvetismentOne);

export default router;
