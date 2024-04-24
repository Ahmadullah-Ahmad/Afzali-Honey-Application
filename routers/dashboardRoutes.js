import Express from "express";

import { countAllProduct } from "../controllers/dashboardController.js";
import { protectRoute } from "../controllers/authController.js";
const router = Express.Router();

router.use(protectRoute);
router.route("/").get(countAllProduct);

export default router;
