import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./ui/select";
import axios from "axios";
import { toast } from "react-toastify";
import { Form, useLoaderData, useNavigate } from "react-router-dom";
import { useContext } from "react";
import QuizContext from "../context/QuizContext.js";
import { AdminContext } from "@/context/AdminPageContext";
import useAdminStore from "@/store/useAdminStore";

const Newquiz = () => {
  const navigate = useNavigate();
  const { quizzes, categories } = useAdminStore();
  const addQuiz = useAdminStore((state) => state.addQuiz);
  // const categories = adminData?.categories?.data?.categories || [];
  // const initialQuizes = adminData?.quizes?.data?.quizes || [];

  const [loading, setLoading] = useState(false);
  // const { quizzes, setQuizzes } = useState(initialQuizes);
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    category_id: "",
    questions: Array(5)
      .fill(null)
      .map(() => ({
        text: "",
        choices: Array(4)
          .fill(null)
          .map(() => ({ text: "", isCorrect: false })),
      })),
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizData({ ...quizData, [name]: value });
  };

  const handleQuestionChange = (index, e) => {
    const { value } = e.target;
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[index].text = value;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleChoiceChange = (questionIndex, choiceIndex, e) => {
    const { value } = e.target;
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex].choices[choiceIndex].text = value;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  const handleCorrectnessChange = (questionIndex, choiceIndex) => {
    const updatedQuestions = [...quizData.questions];
    updatedQuestions[questionIndex].choices[choiceIndex].isCorrect = true;
    setQuizData({ ...quizData, questions: updatedQuestions });
  };

  // FOrm SUbmission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // console.log(
      //   "Data to be submitted to the backend as quiz data is ",
      //   quizData
      // );
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/quizzes/create-quiz`,
        quizData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      // console.log("Response from the backend is", response);

      if (response.data.statusCode === 201) {
        setLoading(false);
        setQuizData({
          title: "",
          description: "",
          category_id: "",
          questions: Array(5).fill({
            text: "",
            choices: Array(4).fill({ text: "", isCorrect: false }),
          }),
        });
        // console.log("NeW quiz creation resposne", response);
        addQuiz(response.data.data);

        toast.success("Quiz created successfully");
        navigate("/admin/quizzes");
        // console.log(
        //   "Quiz Submitted successfully, response.data",
        //   response.data
        // );
      } else {
        if (response.data.data === null || response.data.errors) {
          response.data.errors.map((error) => toast.error(error));
          return null;
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to create a quiz");
      // console.error("Error submitting quiz", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <Card className="w-full">
        <Form onSubmit={handleSubmit} method="post" className="space-y-6">
          <CardHeader>
            <CardTitle>Create A New Quiz</CardTitle>
            <CardDescription>Fill quiz information below</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Quiz Name and Category */}
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name of Quiz</Label>
                <Input
                  id="name"
                  name="title"
                  placeholder="Name of your Quiz"
                  value={quizData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description of Quiz</Label>
                <Input
                  id="description"
                  name="description"
                  placeholder="Description of your quiz"
                  value={quizData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="category">Choose category</Label>
                <Select
                  value={quizData.category_id}
                  onValueChange={(value) =>
                    setQuizData((prev) => ({ ...prev, category_id: value }))
                  }
                >
                  <SelectTrigger id="category" name="category">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {categories.map((category) => (
                      <SelectItem value={category._id} key={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Questions Section */}
            <div className="space-y-6">
              {quizData.questions.map((question, qIndex) => (
                <div key={qIndex} className="border p-4 rounded-lg space-y-4">
                  <Label
                    htmlFor={`question-${qIndex}`}
                    className="text-lg font-medium"
                  >
                    Question {qIndex + 1}
                  </Label>
                  <Input
                    id={`question-${qIndex}`}
                    placeholder={`Enter Question ${qIndex + 1}`}
                    value={question.text}
                    onChange={(e) => handleQuestionChange(qIndex, e)}
                    required
                  />
                  <div className="grid grid-cols-1 gap-4">
                    {question.choices.map((choice, cIndex) => (
                      <Input
                        key={cIndex}
                        placeholder={`Choice ${cIndex + 1}`}
                        value={choice.text}
                        onChange={(e) => handleChoiceChange(qIndex, cIndex, e)}
                        required
                      />
                    ))}
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label>Select Correct Option</Label>
                    <Select
                      value={question.choices
                        .findIndex((choice) => choice.isCorrect)
                        .toString()}
                      onValueChange={(value) =>
                        handleCorrectnessChange(qIndex, Number(value))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select the correct option" />
                      </SelectTrigger>
                      <SelectContent>
                        {question.choices.map((_, cIndex) => (
                          <SelectItem key={cIndex} value={cIndex.toString()}>
                            Option {cIndex + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={() => navigate("/admin/quizzes")}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disbaled={loading}
              className={`loading ? "text-slate-400`}
            >
              {loading ? "Submitting" : "Create"}
            </Button>
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
};

export default Newquiz;
