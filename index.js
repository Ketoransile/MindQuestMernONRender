import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./db/index.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRouter.js";
import authRoutes from "./routes/authRouter.js";
import { errorHandlerMiddleware } from "./middlewares/errorHandler.middlewares.js";
import categoryRoutes from "./routes/categoryRouter.js";
import authenticateUser from "./middlewares/auth.middlewares.js";
import quizRoutes from "./routes/quizRouter.js";
import resultRoutes from "./routes/resultRouter.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
// app.use(express.static(path.resolve(__dirname, "./public")));

// common middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.static(path.resolve(__dirname, "./client/dist")));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// app.get("/", (req, res) => {
//   res.status(200).json({ message: "hello world" });
// });
// Routes
app.use("/api/v1/users", authenticateUser, userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/categories", authenticateUser, categoryRoutes);
app.use("/api/v1/quizzes", authenticateUser, quizRoutes);
app.use("/api/v1/results", authenticateUser, resultRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
});

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use(errorHandlerMiddleware);

// app.use(express.static(path.join(__dirname, "../../frontend/dist")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../../frontend/dist", "index.html"));
// });

const port = process.env.PORT || 5001;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("Server is not connecting to mongo", error);
  });
