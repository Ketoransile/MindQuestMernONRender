import express from "express";
import { authenticateAdmin } from "../middlewares/authAdmin.middlewares.js";
import {
  createQuiz,
  deleteQuiz,
  getAllQuizes,
  getSingleQuiz,
  updateQuiz,
} from "../controllers/quiz.controllers.js";
import {
  validateQuizId,
  validateQuizInput,
} from "../middlewares/validation.middlewares.js";
const router = express.Router();

router
  .route("/create-quiz")
  .post(authenticateAdmin, validateQuizInput, createQuiz);
router
  .route("/delete-quiz/:id")
  .delete(authenticateAdmin, validateQuizId, deleteQuiz);
router
  .route("/update-quiz/:id")
  .patch(authenticateAdmin, validateQuizId, updateQuiz);
router.route("/").get(getAllQuizes);
router.route("/:id").get(validateQuizId, getSingleQuiz);
export default router;
