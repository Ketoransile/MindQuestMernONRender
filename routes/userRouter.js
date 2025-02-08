import express from "express";
import { authenticateAdmin } from "../middlewares/authAdmin.middlewares.js";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
} from "../controllers/users.controller.js";
import { validateDeleteUsersId } from "../middlewares/validation.middlewares.js";

const router = express.Router();

router.route("/").get(authenticateAdmin, getAllUsers);
router
  .route("/:id")
  .delete(authenticateAdmin, validateDeleteUsersId, deleteUser);

router.route("/me").get(getSingleUser);
export default router;
