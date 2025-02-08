import * as React from "react";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Navigate, useNavigate } from "react-router-dom";
export function UsersQuizCard({ quiz, setSelectedQuiz }) {
  const navigate = useNavigate();

  const handleClick = () => {
    setSelectedQuiz(quiz);
    navigate("/users/start-quiz");
  };
  return (
    <Card className="w-[250px] h-min-[300px] h-max-[350px]">
      <CardHeader>
        <CardTitle className="pb-4">{quiz.title}</CardTitle>
        <CardDescription className="break-words min-h-[100px] max-h-[100px] overflow-y-auto">
          {quiz.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex  w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            {quiz.questions.length} Questions
          </div>
          {/* <div className="flex flex-col space-y-1.5">30 Seconds</div> */}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleClick}>Begin</Button>
      </CardFooter>
    </Card>
  );
}
