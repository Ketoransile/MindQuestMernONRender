import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

export const authenticateUser = async (req, res, next) => {
  try {
    // console.log(
    //   "req.cookies.token console log from authenticatemiddleware",
    //   req.cookies.token
    // );
    const token = req.cookies.token;
    if (!token) {
      return res.json(
        new ApiError(StatusCodes.UNAUTHORIZED, "Please login first", [
          "Authentication Failed",
        ])
      );
    }
    // const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    // req.user = { userId };
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded token: ", decoded);
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    // console.log(error);
    next(error);
  }
};
export default authenticateUser;
