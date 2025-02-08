import axios from "axios";
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

const adminPageLoader = async () => {
  try {
    // Fetch current user
    const userResponse = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/users/me`,
      { withCredentials: true }
    );

    // console.log("Uer Response:", userResponse); // Debugging

    const userData = userResponse.data.data;
    const errors = userResponse.data.errors;

    // Check if user data is invalid
    if (!userData) {
      if (errors) {
        errors.forEach((error) => toast.error(error));
      }
      return redirect("/unauthorized");
    }

    // Ensure user object exists
    if (!userData.user || userData.user.role !== "admin") {
      return redirect("/unauthorized");
    }

    // Fetch admin-related data
    const [quizzes, categories, users] = await Promise.all([
      axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/quizzes/`, {
        withCredentials: true,
      }),
      axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/categories/`, {
        withCredentials: true,
      }),
      axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/v1/users/`, {
        withCredentials: true,
      }),
    ]);

    // Return the data
    return {
      quizzes: quizzes.data.data.quizzes || [],
      categories: categories.data.data.categories || [],
      users: users.data.data || [],
    };
  } catch (error) {
    // console.error("Error loading admin page:", error);

    // Show a toast if it's a known error (like unauthorized access)
    if (error.response?.status === 401) {
      toast.error("Unauthorized! Please log in again.");
      return redirect("/login");
    }

    return redirect("/error"); // Redirect to an error page
  }
};

export default adminPageLoader;
