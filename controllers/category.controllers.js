import { StatusCodes } from "http-status-codes";
import { Category } from "../models/category.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Quiz } from "../models/quiz.model.js";

export const createCategory = async (req, res, next) => {
  try {
    const existingCategory = await Category.findOne({ name: req.body.name });
    if (existingCategory) {
      return res.json(
        new ApiError(StatusCodes.BAD_REQUEST, "Category already exists", [
          "Category exists. Try again with new cateogry",
        ])
      );
    }
    const newCategory = new Category({
      name: req.body.name,
      description: req.body.description,
    });
    await newCategory.save();
    res.json(
      new ApiResponse(
        StatusCodes.CREATED,
        newCategory,
        "Successfully created a category!"
      )
    );
  } catch (error) {
    next(error);
  }
};
export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existingQuiz = await Quiz.findOne({ category_id: id });
    if (existingQuiz) {
      return res.json(
        new ApiError(StatusCodes.BAD_REQUEST, "Cannot Delete Category", [
          "This category is associated with existing quizzes. Please delete those quizzes first.",
        ])
      );
    }
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.json(
        new ApiError(StatusCodes.NOT_FOUND, "No category found ", [
          "No category was found with the Id",
        ])
      );
    }
    res.json(
      new ApiResponse(
        StatusCodes.OK,
        deletedCategory,
        "Category deleted successfully!"
      )
    );
  } catch (error) {
    next(error);
  }
};

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    if (!categories || categories.length === 0) {
      return res.json(
        new ApiResponse(
          StatusCodes.NOT_FOUND,
          categories,
          "No categories found in the database"
        )
      );
    }
    const numberOfCategories = await Category.countDocuments();
    res.json(
      new ApiResponse(
        StatusCodes.OK,
        { quantity: numberOfCategories, categories: categories },
        "Categories are successfully fetched!"
      )
    );
  } catch (error) {
    next(error);
  }
};

export const getSingleCategory = async (req, res, next) => {
  try {
    const category = await Category.findOne({ _id: req.params.id });
    if (!category) {
      return res.json(
        new ApiError(
          StatusCodes.BAD_REQUEST,
          "Error occurred while fetching a category",
          ["Failed to fetch category"]
        )
      );
    }
    res.json(
      new ApiResponse(
        StatusCodes.OK,
        { category },
        "Category fetched successfully"
      )
    );
  } catch (error) {
    next(error);
  }
};
