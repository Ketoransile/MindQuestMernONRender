import { StatusCodes } from "http-status-codes";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users || users.length === 0) {
      res.json(
        new ApiError(
          StatusCodes.NOT_FOUND,
          "No users are there in the database",
          ["No users are found in the database,"]
        )
      );
      // return null;
    }

    res.json(
      new ApiResponse(StatusCodes.OK, users, "Users are fetched successfully!!")
    );
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      res.json(
        new ApiError(StatusCodes.BAD_REQUEST, "Unable to delete the user", [
          "Failed to delete the user",
        ])
      );
    }
    res.json(
      new ApiResponse(StatusCodes.OK, deletedUser, "User Successfullly Deleted")
    );
  } catch (error) {
    next(error);
  }
};
export const getSingleUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.userId });

    if (!user) {
      return res.json(
        new ApiError(StatusCodes.NOT_FOUND, "User was not found", [
          "User was not found",
        ])
      );
    }

    return res.json(new ApiResponse(StatusCodes.OK, { user }, "User  data`"));
  } catch (error) {
    next(error);
  }
};
