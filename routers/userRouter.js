import express from "express";

const router = express.Router();
import {
  createUser,
  deleteUser,
  getAll,
  getMe,
  getOne,
  resizeUserPhoto,
  updateMe,
  updateUser,
  uploadUserPhoto,
} from "../controllers/userController.js";
import {
  login,
  protectRoute,
  restrictTo,
  updatePassword,
} from "../controllers/authController.js";

router.post("/login", login);
router.use(protectRoute);
router.patch("/updatePassword", updatePassword);
router.patch("/updateMe", uploadUserPhoto, resizeUserPhoto, updateMe);
router.get("/me", getMe, getOne);
router.use(restrictTo("admin"));
router.route("/").post(createUser).get(getAll);
router.route("/:id").delete(deleteUser).patch(updateUser).get(getOne);

export default router;
