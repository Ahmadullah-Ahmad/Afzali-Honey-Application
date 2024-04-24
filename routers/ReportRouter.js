import Express from "express";

const router = Express.Router();
import { getSalesForReport } from "../controllers/ReportController.js";
import { protectRoute } from "../controllers/authController.js";
router.route("/").get(protectRoute, getSalesForReport);

export default router;
