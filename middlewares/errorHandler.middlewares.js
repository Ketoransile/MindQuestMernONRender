import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
const errorHandlerMiddleware = (err, req, res, next) => {
  // console.log("This is from error handler middleware....................", err);
  // console.log(err);
  const statusCode = err.statusCode || 500;
  // console.log(err);
  const msg = err.message || `Something went wrong, try again later`;
  const errors = err.errors;
  res.json(new ApiError(statusCode, msg, errors));
};
export { errorHandlerMiddleware };
