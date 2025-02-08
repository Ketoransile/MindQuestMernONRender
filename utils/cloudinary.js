// import { v2 as cloudinary } from "cloudinary";
// import fs from "fs";
// import { ApiError } from "./ApiError.js";
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
// });

// const uploadOnCloudinary = async (localFilePath) => {
//   try {
//     if (!localFilePath)
//       return res.json(
//         new ApiError(404, "NO local fiile path ", ["local file path error"])
//       );
//     const uploadResult = await cloudinary.uploader.upload(localFilePath, {
//       resource_type: "auto",
//     });
//     console.log("File uploaded on cloudinary. .FIle src", uploadResult.url);
//     fs.unlinkSync(localFilePath);
//     return uploadResult;
//   } catch (error) {
//     fs.unlinkSync(localFilePath);
//     return null;
//   }
// };
// export default uploadOnCloudinary;
import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiError } from "./ApiError.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) {
    // console.error("No local file path provided.");
    return null; // Or throw a custom error if needed
  }

  try {
    // Upload file to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", // auto-detect file type
    });

    // console.log("File uploaded to Cloudinary. File URL:", uploadResult.url);

    // Remove the local file after successful upload
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return uploadResult;
  } catch (error) {
    // Log the error for debugging
    // console.error("Error uploading file to Cloudinary:", error.message);
    // console.error("Error details:", error);

    // Ensure the file is removed if it exists
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    // Return a custom error or null
    return null;
  }
};

export default uploadOnCloudinary;
