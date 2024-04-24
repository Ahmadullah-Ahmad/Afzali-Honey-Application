import Express from "express";

import {
  createBranch,
  getAllBranch,
  updateBranch,
  deleteBranch,
  getInfo,
} from "../controllers/branchController.js";
import { protectRoute, restrictTo } from "../controllers/authController.js";
const router = Express.Router();

router.get("/contact", getInfo);
router.use(protectRoute);
router.use(restrictTo("admin"));
router.route("/").post(createBranch).get(getAllBranch);

router.route("/:id").patch(updateBranch).delete(deleteBranch);

export default router;
