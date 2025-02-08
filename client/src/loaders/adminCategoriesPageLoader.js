import axios from "axios";
import { toast } from "react-toastify";

export const adminCategoriesPageLoader = async () => {
  try {
    const response = await axios.get(`/api/v1/categories`, {
      withCredentials: true,
    });

    if (!response) {
      return toast.error("Failed to fetch categories data");
    }
    // console.log("Category fetch data is: ", response);
    // if(response)
    return response.data.data.categories;
  } catch (error) {
    // console.log("Error fetching categories data", error);
    return toast.error("Failed to fetch categories");
  }
};
