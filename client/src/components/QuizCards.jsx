import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "./ui/card";
import { Label } from "./ui/label";
import { toast } from "react-toastify";
import axios from "axios";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "./ui/alert-dialog";
import useAdminStore from "../store/useAdminStore";

const QuizCards = ({ quiz }) => {
  const removeQuiz = useAdminStore((state) => state.removeQuiz);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `/api/v1/quizzes/delete-quiz/${quiz._id}`,
        { withCredentials: true }
      );
      // console.log("Response of delete quiz", response);
      if (response.data?.statusCode === 200) {
        toast.success(response.data.message || "Quiz deleted successfully!");
        removeQuiz(quiz._id);
      } else {
        toast.error(response.data.message || "Failed to delete the quiz.");
      }
    } catch (error) {
      // console.error("Error while deleting a quiz:", error);
      toast.error(
        error.response?.data?.message || "Failed to delete the quiz."
      );
    }
  };

  return (
    <Card className="w-[300px] min-h-[300px] max-h-[3000px]">
      <CardHeader>
        <CardTitle>{quiz.title}</CardTitle>
        <CardDescription className="max-h-[100px] min-h-[100px] overflow-y-auto break-words">
          {quiz.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex gap-4 items-center">
            <Label htmlFor="category">Category</Label>
            <span id="category">{quiz.category_id.name}</span>
          </div>
          <div className="flex gap-4 items-center  ">
            <Label htmlFor="total">Total Questions</Label>
            <span id="total">{quiz.questions.length}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>Delete</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                quiz from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default QuizCards;
