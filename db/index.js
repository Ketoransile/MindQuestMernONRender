import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `\n Database connected successfully !! \n DB-host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB connection error\n", error);
    process.exit(1);
  }
};

export default connectDB;
