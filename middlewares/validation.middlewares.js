import { body, validationResult, param } from "express-validator";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { Category } from "../models/category.model.js";
import mongoose from "mongoose";
import { Quiz } from "../models/quiz.model.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      // console.log(errors);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        return res.json(new ApiError(400, "Validation Errors", errorMessages));
      }
      next();
    },
  ];
};

export const validateRegisterUserInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user)
        throw new ApiError(400, "email already exists", [
          "Email already exists, please try again with another email",
        ]);
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),

  body("username")
    .notEmpty()
    .withMessage("username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long")
    .isLength({ max: 50 })
    .withMessage("Username mst be at most 50 characters long"),
  // body("avatar").notEmpty().withMessage("Profile image is required"),
  body("avatar").custom((value, { req }) => {
    if (!req.file) {
      throw new ApiError(400, "Profile image is required", [
        "Avatar file is missing. Please upload a profile image.",
      ]);
    }
    return true; // This signals successful validation
  }),
]);

export const validateLoginInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password").notEmpty().withMessage("Password is required"),
]);

export const validateUpdateUserInput = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be atleast 8 characters"),
  body("username").notEmpty().withMessage("username is required"),
]);
export const validateCreateCategoryInput = withValidationErrors([
  body("name")
    .notEmpty()
    .withMessage("Category name is required")
    .isLength({ min: 3 })
    .withMessage("Category name must at least be 3 characters")
    .isLength({ max: 50 })
    .withMessage("Category name must at least be 50 characters"),
  body("description")
    .notEmpty()
    .withMessage("Category description is required")
    .isLength({ max: 500 })
    .withMessage("Category description must not exceed 500 characters"),
]);
export const validateCategoryIdParam = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new Error("Invalid MongoDD id");
    const category = await Category.findById(value);
    if (!category) throw new Error(`No category found with the id ${value}`);
  }),
]);
export const validateQuestionInput = withValidationErrors([
  body("text")
    .notEmpty()
    .withMessage("Text of the question is required")
    .isLength({ min: 10 })
    .withMessage("The question must be at least 10 characters long"),
  body("choices")
    .notEmpty()
    .withMessage("Choices are required for the question to be created")
    .isArray({ min: 4, max: 4 })
    .withMessage("Exactly 4 choices are required for the question"),
  // Validate each choice object
  body("choices.*.text")
    .notEmpty()
    .withMessage("Each choice must have text")
    .isString()
    .withMessage("Choice text must be a string"),

  // body("choices.*.isCorrect")
  //   .isBoolean()
  //   .withMessage("Each choice must have a boolean isCorrect property"),

  // Ensure at least one choice is marked as correct
  body("choices").custom((choices) => {
    const correctAnswers = choices.filter(
      (choice) => choice.isCorrect === true
    );
    if (correctAnswers.length === 0) {
      throw new Error("At least one choice must be marked as correct");
    }
    return true;
  }),

  // Ensure no more than one choice is marked as correct (optional, if required)
  body("choices").custom((choices) => {
    const correctAnswers = choices.filter(
      (choice) => choice.isCorrect === true
    );
    if (correctAnswers.length > 1) {
      throw new Error("Only one choice can be marked as correct");
    }
    return true;
  }),
  body("category_id")
    .notEmpty()
    .withMessage("Category of question cannot be empty"),
]);

export const validateQuestionId = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new Error("Invalid MongoDD id");
    const question = await Question.findById(value);
    if (!question) throw new Error(`No question found with the id ${value}`);
  }),
]);
export const validateQuizId = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new Error("Invalid MongoDD id");
    const quiz = await Quiz.findById(value);
    if (!quiz) throw new Error(`No Quiz found with the id ${value}`);
  }),
]);
export const validateQuizInput = withValidationErrors([
  body("title").notEmpty().withMessage("Quiz title is required"),
  body("description")
    .notEmpty()
    .withMessage("Quiz description is required")
    .isLength({ min: 10 })
    .withMessage("Quiz description must be at least 10 characters long"),
  body("category_id")
    .notEmpty()
    .withMessage("Category is required for each Quiz")
    .custom(async (value, { req }) => {
      const isValidId = mongoose.Types.ObjectId.isValid(value);
      if (!isValidId) throw new Error("Invalid MongoDD id");
    }),
  body("questions")
    .notEmpty()
    .withMessage("Questions are required to create a quiz")
    .isArray({ min: 5 })
    .withMessage("Questions must be an array with at least 5 items")
    .custom(async (array, { req }) => {
      if (!Array.isArray(array)) {
        throw new Error("Questions must be an array");
      }
    }),
]);
export const validateResultInput = withValidationErrors([
  // body("user_id")
  //   .notEmpty()
  //   .withMessage("User ID is required")
  //   .custom((value) => {
  //     if (!mongoose.Types.ObjectId.isValid(value)) {
  //       throw new Error("Invalid MongoDB ID for user_id");
  //     }
  //     return true;
  //   }),
  body("user_id").custom((value, { req }) => {
    if (req.user && req.user.userId) {
      return true;
    }
    if (!value || !mongoose.Types.ObjectId.isValid(value)) {
      throw new Error("Invalid MongoDb Id for User_id");
    }
  }),
  body("quiz_id")
    .notEmpty()
    .withMessage("Quiz ID is required")
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error("Invalid MongoDB ID for quiz_id");
      }
      return true;
    }),

  // body("score")
  //   .notEmpty()
  //   .withMessage("Score is required")
  //   .isNumeric()
  //   .withMessage("Score must be a number"),

  // body("status")
  //   .notEmpty()
  //   .withMessage("Status is required")
  //   .isIn(["passed", "failed"])
  //   .withMessage("Status must be either 'passed' or 'failed'"),

  body("answers")
    .isArray({ min: 1 })
    .withMessage("Answers must be an array with at least 1 item")
    .custom((answers) => {
      // Validate each answer in the array
      answers.forEach((answer) => {
        if (!answer.user_answer || typeof answer.user_answer !== "string") {
          throw new Error(
            "Each answer must have a valid user_answer as a string"
          );
        }
      });
      return true;
    }),

  // body("time_taken")
  //   .notEmpty()
  //   .withMessage("Time taken is required")
  //   .isNumeric()
  //   .withMessage("Time taken must be a number"),
]);
export const validateDeleteUsersId = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new Error("Invalid MongoDD id");
    const user = await User.findById(value);
    if (user && user.role === "admin")
      throw new Error("The admin cannot be deleted");
    if (!user) throw new Error(`No User found with the id ${value}`);
  }),
]);
export const validateCategoryId = withValidationErrors([
  param("id").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new Error("Invalid mongoDB ID");
  }),
]);
