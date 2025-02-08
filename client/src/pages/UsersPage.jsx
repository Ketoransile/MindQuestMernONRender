import UsersPageHeader from "@/components/UsersPageHeader";
import { Button } from "../components/ui/button";
import { UsersQuizCard } from "../components/Userspage/UsersQuizCard";
import useUsersStore from "../store/useUsersStore";
import { useEffect } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  useLoaderData,
} from "react-router-dom";

const UsersPage = () => {
  const initialData = useLoaderData(); // Data from the loader
  const navigate = useNavigate();
  const location = useLocation();

  const initializeUsersData = useUsersStore(
    (state) => state.initializeUsersData
  );

  useEffect(() => {
    // Initialize Zustand store with data from the loader
    initializeUsersData(initialData);
  }, [initialData, initializeUsersData]);

  const { quizzes, results } = initialData;
  // console.log("Quizzes array to be saved:", quizzes);
  // console.log("Results array to be saved:", results);

  const setSelectedQuiz = useUsersStore((state) => state.setSelectedQuiz);

  const handleClickResultsPage = () => {
    navigate("/users/my-result");
  };
  return location.pathname.includes("start-quiz") ? (
    <Outlet />
  ) : (
    <div className="flex flex-col bg-front min-h-screen p-10 gap-10">
      <div>
        <UsersPageHeader />
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white mt-10">
          Welcome back, User
        </h1>
        <Button variant="outline" onClick={handleClickResultsPage}>
          See Your Results ({results.length})
        </Button>
      </div>

      <div>
        <p className="text-white text-lg font-bold mt-10">Available quizzes</p>
        <div className="grid grid-cols-4 gap-4 mt-10">
          {quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <UsersQuizCard
                key={quiz._id}
                quiz={quiz}
                setSelectedQuiz={setSelectedQuiz}
              />
            ))
          ) : (
            <p className="text-white">No quizzes available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
