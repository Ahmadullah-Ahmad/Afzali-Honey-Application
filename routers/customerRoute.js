import Express from "express";

import {
  getAllCustomer,
  getOneCustomer,
  deleteCustomer,
  updateCustomer,
} from "../controllers/customerController.js";
import { protectRoute } from "../controllers/authController.js";
const router = Express.Router();

router.use(protectRoute);

router.route("/").get(getAllCustomer);

router
  .route("/:id")
  .get(getOneCustomer)
  .patch(updateCustomer)
  .delete(deleteCustomer);
export default router;
