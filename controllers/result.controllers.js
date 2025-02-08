// import { Result } from "../models/result.model.js";
// import { Quiz } from "../models/quiz.model.js";
// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import { StatusCodes } from "http-status-codes";

// export const submitQuiz = async (req, res, next) => {
//   try {
//     const { quiz_id, answers, start_time } = req.body;
//     const user_id = req.user.userId;
//     console.log("req.user is ", req.user);

//     console.log("user id in result contoller submitQUiz is", user_id);
//     // Validate required fields
//     if (!user_id || !quiz_id || !answers || !start_time) {
//       return next(
//         new ApiError(StatusCodes.BAD_REQUEST, "Missing required fields", [
//           "user_id, quiz_id, answers, and start_time are required.",
//         ])
//       );
//     }

//     // Fetch the quiz with questions populated
//     const quiz = await Quiz.findById(quiz_id).populate("questions");
//     if (!quiz) {
//       return next(
//         new ApiError(StatusCodes.NOT_FOUND, "Quiz not found", [
//           "Invalid quiz ID provided.",
//         ])
//       );
//     }

//     // Process answers and calculate the score
//     let score = 0;
//     const processedAnswers = answers.map((answer) => {
//       const question = quiz.questions.find(
//         (q) => q._id.toString() === answer.question_id
//       );
//       if (!question) {
//         return {
//           question_id: answer.question_id,
//           user_answer: answer.user_answer,
//           correct_answer: "Invalid question ID",
//         };
//       }
//       const isCorrect = question.choices.some(
//         (choice) => choice.text === answer.user_answer && choice.isCorrect
//       );
//       if (isCorrect) score++;
//       return {
//         question_id: answer.question_id,
//         user_answer: answer.user_answer,
//         correct_answer: question.choices.find((choice) => choice.isCorrect)
//           ?.text,
//       };
//     });

//     // Calculate time taken in seconds
//     const time_taken = Math.round((Date.now() - start_time) / 1000); //in seconds

//     // Determine pass/fail status
//     const status = score >= quiz.questions.length / 2 ? "passed" : "failed";

//     // Save the result to the database
//     const result = new Result({
//       user_id,
//       quiz_id,
//       score,
//       time_taken,
//       status,
//       answers: processedAnswers,
//     });
//     await result.save();

//     // Send response
//     res.json(
//       new ApiResponse(
//         StatusCodes.CREATED,
//         result,
//         "Quiz submitted successfully"
//       )
//     );
//   } catch (error) {
//     next(error);
//   }
// };
// export const getResultById = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await Result.findById(id)
//       .populate("quiz_id")
//       .populate("answers.question_id");
//     if (!result) {
//       return res(
//         new ApiError(StatusCodes.NOT_FOUND, "Result not found", [
//           `No result found for ID ${id}`,
//         ])
//       );
//     }

//     res.json(
//       new ApiResponse(StatusCodes.OK, result, "Result retreived successfully!")
//     );
//   } catch (error) {
//     next(error);
//   }
// };
// export const deleteResult = async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const result = await Result.findByIdAndDelete(id);
//     if (!result) {
//       return res.json(
//         new ApiError(StatusCodes.NOT_FOUND, "Result not found", [
//           `No result found with the id ${id}`,
//         ])
//       );
//     }
//     res.json(
//       new ApiResponse(StatusCodes.OK, null, "Result deleted successfull")
//     );
//   } catch (error) {
//     next(error);
//   }
// };
import { Result } from "../models/result.model.js";
import { Quiz } from "../models/quiz.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { StatusCodes } from "http-status-codes";

export const submitQuiz = async (req, res, next) => {
  try {
    const { quiz_id, answers, start_time } = req.body;
    const user_id = req.user.userId;
    // console.log("req.user is ", req.user);

    // console.log("user id in result controller submitQuiz is", user_id);
    // Validate required fields
    if (!user_id || !quiz_id || !answers || !start_time) {
      return next(
        new ApiError(StatusCodes.BAD_REQUEST, "Missing required fields", [
          "user_id, quiz_id, answers, and start_time are required.",
        ])
      );
    }

    // Fetch the quiz with questions populated
    const quiz = await Quiz.findById(quiz_id);
    if (!quiz) {
      return next(
        new ApiError(StatusCodes.NOT_FOUND, "Quiz not found", [
          "Invalid quiz ID provided.",
        ])
      );
    }

    // Process answers and calculate the score
    let score = 0;
    const processedAnswers = answers.map((answer) => {
      const question = quiz.questions.find((q) => q.text === answer.text);
      if (!question) {
        return {
          text: answer.text,
          user_answer: answer.user_answer,
          correct_answer: "Invalid question",
        };
      }
      const isCorrect = question.choices.some(
        (choice) => choice.text === answer.user_answer && choice.isCorrect
      );
      if (isCorrect) score++;
      return {
        text: answer.text,
        user_answer: answer.user_answer,
        correct_answer: question.choices.find((choice) => choice.isCorrect)
          ?.text,
      };
    });

    // Calculate time taken in seconds
    const time_taken = Math.round((Date.now() - start_time) / 1000); // in seconds

    // Determine pass/fail status
    const status = score >= quiz.questions.length / 2 ? "passed" : "failed";

    // Save the result to the database
    const result = new Result({
      user_id,
      quiz_id,
      score,
      time_taken,
      status,
      answers: processedAnswers,
    });
    await result.save();

    // Send response
    res.json(
      new ApiResponse(
        StatusCodes.CREATED,
        result,
        "Quiz submitted successfully"
      )
    );
  } catch (error) {
    next(error);
  }
};

export const getResultById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Result.findById(id).populate("quiz_id");
    if (!result) {
      return next(
        new ApiError(StatusCodes.NOT_FOUND, "Result not found", [
          `No result found for ID ${id}`,
        ])
      );
    }

    res.json(
      new ApiResponse(StatusCodes.OK, result, "Result retrieved successfully!")
    );
  } catch (error) {
    next(error);
  }
};

export const deleteResult = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Result.findByIdAndDelete(id);
    if (!result) {
      return next(
        new ApiError(StatusCodes.NOT_FOUND, "Result not found", [
          `No result found with the id ${id}`,
        ])
      );
    }
    res.json(
      new ApiResponse(StatusCodes.OK, null, "Result deleted successfully")
    );
  } catch (error) {
    next(error);
  }
};
export const getResultsByUserId = async (req, res, next) => {
  try {
    const { user_id } = req.params;
    const results = await Result.find({ user_id }).populate("quiz_id");

    if (!results.length) {
      return next(
        new ApiError(StatusCodes.NOT_FOUND, "No results found", [
          `No results found for user ID ${user_id}`,
        ])
      );
    }

    res.json(
      new ApiResponse(
        StatusCodes.OK,
        results,
        "Results retrieved successfully!"
      )
    );
  } catch (error) {
    next(error);
  }
};
export const getResultsAverage = async (req, res, next) => {
  const results = await Result.findOne({ user_id: req.user.userId });
  if (!results) {
    res.json(
      new ApiError(StatusCodes.NOT_FOUND, "No result find for this user", [
        "No result was found",
      ])
    );
  }
  const averageResult = results.reduce(
    (accumulator, result) => accumulator + result.score,
    0
  );
  return averageResult;
};
