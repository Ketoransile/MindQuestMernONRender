import { StatusCodes } from "http-status-codes";
import { Quiz } from "../models/quiz.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// export const createQuiz = async (req, res, next) => {
//   try {
//     const newQuiz = new Quiz({
//       title: req.body.title,
//       description: req.body.description,
//       category_id: req.body.category_id,
//       questions: req.body.questions,
//     });

//     const existingQuiz = await Quiz.findOne({ title });
//     if (existingQuiz) {
//       res.json(
//         new ApiError(
//           StatusCodes.BAD_REQUEST,
//           "Quiz with this title aleardy exists",
//           ["Another quiz with the same title exists"]
//         )
//       );
//     }

//     const existingDescription = await Quiz.findOne({ description });
//     if (existingDescription) {
//       res.json(
//         new ApiError(
//           StatusCodes.BAD_REQUEST,
//           "Quiz with this description already exists",
//           ["Another question with this description already exists"]
//         )
//       );
//     }
//     await newQuiz.save();
//     res.json(
//       new ApiResponse(StatusCodes.CREATED, newQuiz, "Quiz created Successfully")
//     );
//   } catch (error) {
//     next(error);
//   }
// };

export const createQuiz = async (req, res, next) => {
  try {
    const { title, description, category_id, questions } = req.body;

    // Check if a quiz with the same title exists
    const existingQuiz = await Quiz.findOne({ title });
    if (existingQuiz) {
      return next(
        new ApiError(
          StatusCodes.BAD_REQUEST,
          "Quiz with this title already exists",
          ["Another quiz with the same title exists"]
        )
      );
    }

    // Check if a quiz with the same description exists
    const existingDescription = await Quiz.findOne({ description });
    if (existingDescription) {
      return next(
        new ApiError(
          StatusCodes.BAD_REQUEST,
          "Quiz with this description already exists",
          ["Another quiz with the same description exists"]
        )
      );
    }

    // Create and save the new quiz
    const newQuiz = new Quiz({
      title,
      description,
      category_id,
      questions,
    });

    await newQuiz.save();

    // Send a success response
    return res
      .status(StatusCodes.CREATED)
      .json(
        new ApiResponse(
          StatusCodes.CREATED,
          newQuiz,
          "Quiz created successfully"
        )
      );
  } catch (error) {
    next(error);
  }
};

export const deleteQuiz = async (req, res, next) => {
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete({ _id: req.params.id });
    // console.log("Delte quiz output", deleteQuiz);
    res.json(
      new ApiResponse(StatusCodes.OK, deletedQuiz, "Quiz deleted successfully!")
    );
  } catch (error) {
    next(error);
  }
};

export const updateQuiz = async (req, res, next) => {
  try {
    const originalQuiz = await Quiz.findOne({ _id: req.params.id });
    req.body.category_id = originalQuiz.category_id;
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        category_id: req.body.category_id,
        questions: req.body.questions,
      },
      { new: true, runValidators: true }
    );
    res.json(
      new ApiResponse(StatusCodes.OK, updatedQuiz, "Quiz updated successfully")
    );
  } catch (error) {
    next(error);
  }
};
export const getAllQuizes = async (req, res, next) => {
  try {
    const quizzes = await Quiz.find().populate("category_id");
    if (!quizzes || quizzes.length === 0) {
      return res.json(
        new ApiError(
          StatusCodes.NOT_FOUND,
          "No quizes are there in the database",
          ["Quiz collection in the database is empty "]
        )
      );
    }
    const quantity = await Quiz.countDocuments();
    res.json(
      new ApiResponse(
        StatusCodes.OK,
        { quantity, quizzes },
        "Quizes are successfully fetched!"
      )
    );
  } catch (error) {
    next(error);
  }
};
export const getSingleQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.find({ _id: req.params.id }).populate("questions");
    if (!quiz) {
      return res.json(
        new ApiError(400, "No quiz exists with this id", [
          "No quiz exists with this id",
        ])
      );
    }
    res.json(
      new ApiResponse(StatusCodes.OK, quiz, "Quiz successfully fetched")
    );
  } catch (error) {
    next(error);
  }
};
