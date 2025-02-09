import UsersPageHeader from "../components/UsersPageHeader";
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
  const initialData = useLoaderData();
  const navigate = useNavigate();
  const location = useLocation();

  const initializeUsersData = useUsersStore(
    (state) => state.initializeUsersData
  );

  useEffect(() => {
    initializeUsersData(initialData);
  }, [initialData, initializeUsersData]);

  const { quizzes, userImage, username } = initialData;
  const { results } = useUsersStore();
  console.log("Initial userimage fetched from dtabase is", userImage);
  const setSelectedQuiz = useUsersStore((state) => state.setSelectedQuiz);

  const handleClickResultsPage = () => {
    navigate("/users/my-result");
  };

  return (
    <div className="flex flex-col bg-front min-h-screen p-10 gap-10">
      <UsersPageHeader userImage={userImage} />

      {/* Always render child routes */}
      <Outlet />

      {/* Show quizzes and results button only if not inside a child route */}
      {!location.pathname.includes("start-quiz") &&
        !location.pathname.includes("my-result") && (
          <>
            <div className="flex justify-between items-center max-lg:flex-col max-lg:gap-4">
              <h1 className="text-2xl font-bold text-white mt-10">
                Welcome back, {username}
              </h1>
              <Button variant="outline" onClick={handleClickResultsPage}>
                See Your Results ({results.length})
              </Button>
            </div>

            <div>
              <p className="text-white text-lg font-bold mt-10 max-lg:text-center">
                Available quizzes
              </p>
              <div className="grid grid-cols-4 gap-4 mt-10 max-lg:flex max-lg:flex-col max-lg:items-center">
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
            <div className="">
              <p className="text-white text-lg font-bold mt-10 max-lg:text-center">
                Quizzes Taken
              </p>
            </div>
          </>
        )}
    </div>
  );
};

export default UsersPage;
