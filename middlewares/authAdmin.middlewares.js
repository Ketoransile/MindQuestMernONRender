import { User } from "../models/user.model.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

const authenticateAdmin = async (req, res, next) => {
  try {
    const { userId } = req.user;
    if (!userId) {
      return new (ApiError(
        StatusCodes.BAD_REQUEST,
        "No user ID found in the request ",
        ["No user Id found in the request"]
      ))();
    }
    // console.log(userId);
    const user = await User.findOne({ _id: userId });
    const isAdmin = user && user.role === "admin";
    if (!isAdmin || isAdmin === false) {
      return res.json(
        new ApiError(StatusCodes.UNAUTHORIZED, "Unauthorized access", [
          "You must be an admin to access this route",
        ])
      );
    }
    next();
  } catch (error) {
    next(error);
  }
};
export { authenticateAdmin };
