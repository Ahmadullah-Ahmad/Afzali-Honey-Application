import Express from "express";

const router = Express.Router();
import {
  addSpend,
  deleteSpend,
  getAllSpend,
  updateSpend,
  GetOneSpend,
} from "../controllers/spendController.js";
import { protectRoute } from "../controllers/authController.js";
router.route("/").post(protectRoute, addSpend).get(protectRoute, getAllSpend);
router
  .route("/:id")
  .get(protectRoute, GetOneSpend)
  .patch(protectRoute, updateSpend)
  .delete(protectRoute, deleteSpend);

export default router;
