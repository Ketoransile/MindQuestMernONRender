import { Button } from "../ui/button";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import QuizCards from "../QuizCards";
import useAdminStore from "@/store/useAdminStore";

const Quizzes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const quizzes = useAdminStore((state) => state.quizzes) || [];

  return location.pathname.includes("newquiz") ? (
    <Outlet />
  ) : (
    <div className="flex flex-col gap-6 p-10">
      <h1 className="text-2xl font-bold text-white">Quizzes</h1>
      <p className="text-md text-slate-400">View all of your quizzes</p>
      <div className="">
        <Button
          variant="outline"
          onClick={() => navigate("/admin/quizzes/newquiz")}
          className="inline-flex"
        >
          Create New Quiz
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {quizzes.map((quiz) => (
          <QuizCards key={quiz._id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
};

export default Quizzes;
