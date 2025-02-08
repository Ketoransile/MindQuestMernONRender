import express from "express";
import {
  // getAllUsers,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.controllers.js";
import {
  validateLoginInput,
  validateRegisterUserInput,
} from "../middlewares/validation.middlewares.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { authenticateAdmin } from "../middlewares/authAdmin.middlewares.js";
import authenticateUser from "../middlewares/auth.middlewares.js";

const router = express.Router();

router
  .route("/register")
  .post(upload.single("avatar"), validateRegisterUserInput, registerUser);
router.route("/login").post(validateLoginInput, loginUser);
router.route("/logout").post(logoutUser);

// router.route("/").get(authenticateUser, authenticateAdmin, getAllUsers);

export default router;
