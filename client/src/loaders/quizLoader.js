import axios from "axios";

export const quizDataLoader = async () => {
  try {
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   console.error(
    //     "No authentication token found. Please log in before requesting access."
    //   );
    //   return null;
    // }

    const response = await axios.get(
      `${
        import.meta.env.VITE_API_BASE_URL
      }/api/v1/quizes/679143598fead98d64a1f038`,
      {
        // headers: {
        //   Authorization: `Bearer ${token}`, // Add the token in the Authorization header
        // },
        withCredentials: true, // Include cookies if your backend uses them
      }
    );

    if (!response.data) {
      // console.error("No quiz data found in the response.");
      return null;
    }

    // console.log("Quiz data:", response.data);
    return response.data; // Return the quiz data for further use
  } catch (error) {
    // console.error(
    //   "Error while fetching quiz data:",
    //   error.response?.data || error.message
    // );
    return null;
  }
};
