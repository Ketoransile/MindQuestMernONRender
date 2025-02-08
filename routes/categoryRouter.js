import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
} from "../controllers/category.controllers.js";
import {
  validateCategoryIdParam,
  validateCreateCategoryInput,
} from "../middlewares/validation.middlewares.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { StatusCodes } from "http-status-codes";
import { authenticateAdmin } from "../middlewares/authAdmin.middlewares.js";

const router = express.Router();

router
  .route("/create-category")
  .post(authenticateAdmin, validateCreateCategoryInput, createCategory);
router
  .route("/delete-category/:id")
  .delete(authenticateAdmin, validateCategoryIdParam, deleteCategory);
router.route("/").get(getAllCategories);

router.route("/:id").get(authenticateAdmin, getSingleCategory);
export default router;
