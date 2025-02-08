import axios from "axios";
import { toast } from "react-toastify";

export const adminquizPageLoader = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/quizes`,
      {
        withCredentials: true,
      }
    );
    if (!response) {
      toast.error("Failed to fetch available Quizes");
      return;
    }
    if (response && response.data.errors) {
      response.data.errors.map((error) => toast.error(error));
    }
    // console.log("response from backend about quizes", response);
    // console.log("quizzes is array ", Array.isArray(response.data.data.quizes));

    return response.data.data.quizes;
  } catch (error) {
    // console.error("Error while fetching quizes", error);
    // console.error("Error ocurres while fetching quizes");
  }
};
