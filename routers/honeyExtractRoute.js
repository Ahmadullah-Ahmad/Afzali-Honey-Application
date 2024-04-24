import express from "express";
import { protectRoute } from "../controllers/authController.js";
import {
  addHoney,
  deleteHoney,
  getHoney,
  getOneHoney,
  updateHoney,
} from "../controllers/honeyExtractController.js";
import HoneyMiddleware from "../utils/beeSaveMiddleware.js";

const router = express.Router();
router.use(protectRoute);
router
  .route("/")
  .post(HoneyMiddleware("add"), addHoney)
  .get(HoneyMiddleware("access"), getHoney);

router
  .route("/:id")
  .get(HoneyMiddleware("access"), getOneHoney)
  .patch(HoneyMiddleware("update"), updateHoney)
  .delete(deleteHoney);

export default router;
