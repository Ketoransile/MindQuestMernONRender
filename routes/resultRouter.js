import express from "express";
import {
  getResultById,
  getResultsByUserId,
  submitQuiz,
} from "../controllers/result.controllers.js";
import { validateResultInput } from "../middlewares/validation.middlewares.js";
import authenticateUser from "../middlewares/auth.middlewares.js";

const router = express.Router();
router.route("/submit-quiz").post(validateResultInput, submitQuiz);
// router.route("/:id").get(getResultById);
router.route("/:user_id").get(getResultsByUserId);
// router.route("/get-all-results").get()
export default router;
