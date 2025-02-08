import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide quiz title"],
    },
    description: {
      type: String,
      required: [true, "Please provide a quiz description"],
    },
    category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    questions: [
      {
        text: {
          type: String,
          required: [true, "Please provide a question text"],
        },
        choices: [
          {
            text: { type: String, required: [true, "Choice text is required"] },
            isCorrect: { type: Boolean, required: true, default: false },
          },
        ],
      },
    ],
  },
  { timestamps: true }
);

export const Quiz = mongoose.model("Quiz", quizSchema);
