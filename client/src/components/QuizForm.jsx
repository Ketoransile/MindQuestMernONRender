import React, { useState } from "react";

const QuizForm = () => {
  const [questions, setQuestions] = useState(
    Array(5).fill({
      questionText: "",
      choices: ["", "", "", ""],
      correctChoice: null,
    })
  );

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === "questionText") {
      updatedQuestions[index].questionText = value;
    } else if (field.startsWith("choice")) {
      const choiceIndex = parseInt(field.replace("choice", ""), 10);
      updatedQuestions[index].choices[choiceIndex] = value;
    } else if (field === "correctChoice") {
      updatedQuestions[index].correctChoice = value;
    }
    setQuestions(updatedQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("Quiz Data:", questions);
    // Submit the quiz data to your API or handle it here
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 p-6 bg-white shadow-lg rounded-lg"
    >
      <h1 className="text-2xl font-bold">Create Quiz</h1>
      {questions.map((question, qIndex) => (
        <div key={qIndex} className="border p-4 rounded-lg">
          <label className="block text-lg font-medium mb-2">
            Question {qIndex + 1}
          </label>
          <input
            type="text"
            placeholder={`Enter Question ${qIndex + 1}`}
            value={question.questionText}
            onChange={(e) =>
              handleQuestionChange(qIndex, "questionText", e.target.value)
            }
            className="w-full border rounded-md p-2 mb-4"
            required
          />
          {question.choices.map((choice, cIndex) => (
            <div key={cIndex} className="flex items-center gap-4 mb-3">
              <input
                type="text"
                placeholder={`Choice ${cIndex + 1}`}
                value={choice}
                onChange={(e) =>
                  handleQuestionChange(
                    qIndex,
                    `choice${cIndex}`,
                    e.target.value
                  )
                }
                className="flex-1 border rounded-md p-2"
                required
              />
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`correctChoice-${qIndex}`}
                  value={cIndex}
                  checked={question.correctChoice === String(cIndex)}
                  onChange={(e) =>
                    handleQuestionChange(
                      qIndex,
                      "correctChoice",
                      e.target.value
                    )
                  }
                  required
                />
                Correct
              </label>
            </div>
          ))}
        </div>
      ))}
      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Submit Quiz
      </button>
    </form>
  );
};

export default QuizForm;
