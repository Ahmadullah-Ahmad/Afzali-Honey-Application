import express from "express";
import { protectRoute } from "../controllers/authController.js";
import {
  addBeeSave,
  deleteBeeSave,
  getAllBeeSave,
  getOneBeeSave,
  updateBeeSave,
} from "../controllers/saveBeeController.js";

const router = express.Router();

router
  .route("/")
  .post(protectRoute, addBeeSave)
  .get(protectRoute, getAllBeeSave);

router
  .route("/:id")
  .get(protectRoute, getOneBeeSave)
  .patch(protectRoute, updateBeeSave)
  .delete(protectRoute, deleteBeeSave);

export default router;
