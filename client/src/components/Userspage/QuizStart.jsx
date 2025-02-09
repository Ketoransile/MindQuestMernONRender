import * as React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import useUsersStore from "../../store/useUsersStore";

const QuizStart = () => {
  const navigate = useNavigate();
  const { selectedQuiz, addResult } = useUsersStore();

  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [selectedAnswers, setSelectedAnswers] = React.useState({});
  const [showResults, setShowResults] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [startTime] = React.useState(Date.now());
  const [loading, setLoading] = React.useState(false);

  if (!selectedQuiz) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-front">
        <h1 className="text-2xl font-bold text-white">No quiz selected!</h1>
        <Button onClick={() => navigate("/users")} variant="outline">
          Go Back
        </Button>
      </div>
    );
  }

  const handleAnswer = (answer) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestionIndex]: answer });
  };

  const nextQuestion = async () => {
    if (selectedAnswers[currentQuestionIndex] === undefined) {
      toast.error("Please choose an option before proceeding.");
      return;
    }
    if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      await submitQuiz();
      setShowResults(true);
    }
  };

  const calculateScore = () => {
    return selectedQuiz.questions.reduce((score, question, index) => {
      const selectedAnswer = selectedAnswers[index];
      return selectedAnswer?.isCorrect ? score + 1 : score;
    }, 0);
  };

  const submitQuiz = async () => {
    const answers = selectedQuiz.questions.map((question, index) => ({
      text: question.text,
      user_answer: selectedAnswers[index]?.text || "",
    }));

    const payload = {
      quiz_id: selectedQuiz._id,
      start_time: startTime,
      answers,
    };

    try {
      setLoading(true);
      const response = await axios.post(
        `/api/v1/results/submit-quiz`,
        payload,
        { withCredentials: true }
      );

      if (response.data.data) {
        setLoading(false);
        const resultData = response.data.data;
        addResult(resultData); // Update Zustand store
        setScore(resultData.score);
        setShowResults(true);
        toast.success("Quiz submitted successfully!");
      }
    } catch (error) {
      // console.error("Error submitting quiz:", error);
      toast.error("Failed to submit quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (showResults) {
    const totalQuestions = selectedQuiz.questions.length;
    const status = score >= totalQuestions / 2 ? "passed" : "failed";

    return (
      <div className="min-h-screen flex flex-col gap-4 shadow-xl items-center justify-center bg-front">
        <h1 className="text-2xl font-bold mb-4 text-white">Result</h1>
        <p className="text-xl mb-4 text-white">
          You scored {score} out of {totalQuestions}
        </p>
        <div className="text-2xl font-bold text-white">
          {status === "failed"
            ? "Failed. Please try again."
            : "Congrats! You've Passed 🎉"}
        </div>
        <Button
          onClick={() => navigate("/users")}
          className="bg-slate-400"
          variant="outline"
        >
          Back to Quiz Selection
        </Button>
      </div>
    );
  }

  const question = selectedQuiz.questions[currentQuestionIndex];

  return (
    <div className="bg-front p-10 min-h-screen max-md:p-4 ">
      <div className="flex flex-col items-center bg-gray-100 p-6 rounded-xl shadow-lg">
        <header className="w-full bg-white p-4 flex max-sm:flex-col max-sm:gap-4 justify-between items-center mb-6 ">
          <h1 className="text-xl font-bold">{selectedQuiz.title}</h1>
          <div className="text-sm bg-gray-200 rounded-full px-4 py-1">
            Question {currentQuestionIndex + 1} of{" "}
            {selectedQuiz.questions.length}
          </div>
        </header>

        <main className="w-full max-w-2xl bg-white p-6 shadow rounded-lg">
          <h2 className="text-lg font-semibold mb-4">{question.text}</h2>
          <div className="mb-6">
            {question.choices.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(option)}
                className={`block w-full text-left border rounded-lg p-3 mb-2 hover:bg-gray-400 ${
                  selectedAnswers[currentQuestionIndex] === option
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-slate-800"
                }`}
              >
                {option.text}
              </Button>
            ))}
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => navigate("/users")}>
              Quit Quiz
            </Button>
            <Button
              onClick={nextQuestion}
              disabled={loading}
              className={`${loading && "text-slate-400"}`}
            >
              {currentQuestionIndex < selectedQuiz.questions.length - 1
                ? "Next"
                : "Submit"}
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default QuizStart;
