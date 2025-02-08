import mongoose from "mongoose";
const resultSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quiz_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    date_taken: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["passed", "failed"],
      required: true,
    },
    answers: [
      {
        text: {
          type: String,
          required: true,
        },
        user_answer: {
          type: String,
          required: true,
        },
        correct_answer: {
          type: String,
          required: true,
        },
      },
    ],
    time_taken: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
export const Result = mongoose.model("Result", resultSchema);
