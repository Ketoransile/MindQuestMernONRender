import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { correctPassword, hashPassword } from "../utils/passwordUtil.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const registerUser = async (req, res) => {
  try {
    // console.log("Uploaded file:", req.file);
    // console.log("Username received by server is  is ", req.body.username);
    const avatarFile = req.file;

    const hashedPassword = await hashPassword(req.body.password);
    const isFirstUser = (await User.countDocuments()) === 0;

    // Avatar upload to cloudinary
    let avatarUrl = null;
    if (avatarFile) {
      const uploadResult = await uploadOnCloudinary(avatarFile.path);
      // console.log("cloudinaryupload result", uploadResult);
      if (uploadResult) {
        avatarUrl = uploadResult.secure_url;
      } else {
        // console.error("failed to upload avatar to cloudinary");
        return res.json(
          new ApiError(500, "Image upload failed", [
            "Failed to process avatar upload",
          ])
        );
      }
    }

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      avatar: avatarUrl,
      password: hashedPassword,
      role: isFirstUser ? "admin" : "user",
    });

    await newUser.save();
    res.json(
      new ApiResponse(201, { user: newUser }, "User created successfully")
    );
  } catch (error) {
    res.json(
      new ApiError(500, "Registration failed", ["Internal server error"])
    );
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    const validUser =
      user && (await correctPassword(req.body.password, user.password));
    if (!validUser) {
      return res.json(
        new ApiError(StatusCodes.UNAUTHORIZED, "Invalid credential", [
          "Invalid credential. Please try again!!",
        ])
      );
    }
    const payload = { userId: user._id };
    const oneDay = 1000 * 60 * 60 * 24;
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    // res.cookie("token", token, {
    //   httpOnly: true,
    //   expires: new Date(Date.now() + oneDay),
    //   secure: process.env.NODE_ENV === "production",
    // });
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      path: "/", // Ensure the path is consistent
    });
    // console.log("Set-Cookie HEADERS: ", res.getHeaders()["set-cookie"]);
    // res.json(
    //   new ApiResponse(StatusCodes.OK, "", "User logged in Successfully")
    // );
    res.json(
      new ApiResponse(
        StatusCodes.OK,
        { role: user.role },
        "User logged in Successfully"
      ) // Return user role
    );
  } catch (error) {
    next(error);
  }
};

// export const logoutUser = async (req, res, next) => {
//   res.cookie("token", "logout", {
//     httpOnly: true,
//     expires: new Date(Date.now()),
//   });
//   res.json(
//     new ApiResponse(
//       StatusCodes.OK,
//       { data: "success" },
//       "USer logged out Successfully"
//     )
//   );
// };
export const logoutUser = async (req, res, next) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    path: "/", // Ensure the path is consistent
  });
  res.json(
    new ApiResponse(
      StatusCodes.OK,
      { data: "success" },
      "User logged out Successfully"
    )
  );
};
