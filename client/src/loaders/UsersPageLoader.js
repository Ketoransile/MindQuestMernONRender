import axios from "axios";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

const usersPageLoader = async () => {
  try {
    const userResponse = await axios.get(`/api/v1/users/me`, {
      withCredentials: true,
    });
    console.log("User Response:", userResponse); // Debuggin

    if (userResponse.data.statusCode !== 200) {
      toast.error("Login failed");
      return redirect("/unauthorized");
    }
    if (userResponse.data.data.user.role !== "user") {
      return redirect("/unauthorized");
    }

    const usersQuizzes = await axios.get(`/api/v1/quizzes/`, {
      withCredentials: true,
    });
    const user_id = userResponse.data.data.user._id;
    // console.log(
    // "user id is..................................---------------------------------------------------------------",
    // user_id
    // );
    const userResults = await axios.get(`/api/v1/results/${user_id}`, {
      withCredentials: true,
    });

    // console.log("User results from users page loader is ", userResults);
    // console.log("usersQuizzes from userspage loader file", usersQuizzes);

    return {
      quizzes: usersQuizzes?.data?.data?.quizzes || [],
      results: userResults?.data?.data || [],
      userImage: userResponse?.data?.data?.user?.avatar || "",
      username: userResponse?.data?.data?.user?.username || "",
    };
  } catch (error) {
    // console.error("Error while fetching users page data", error);
    return redirect("/error");
  }
};
export default usersPageLoader;
