import axios from "axios";

export const adminPageUsersSectionLoader = async (req, res, next) => {
  // try {
  //   const response = await axios.get("/api/v1/users/", {
  //     withCredentials: true,
  //   });

  //   console.log("Response form admin page users sections loader", response);
  //   if (response.data) {
  //     if (response.data.success) {
  //       return response.data.data;
  //     }
  //   } else {
  //     return response.data.errors[0];
  //   }
  // } catch (error) {
  //   next(error);
  // }
  try {
    const response = await axios.get(`/api/v1/users/`, {
      withCredentials: true,
    });

    // console.log("Response from admin page users section loader:", response);

    if (response.data && response.data.success) {
      if (!response.data.data) {
        // If data is null, user is not an admin
        throw new Response("Access Denied: Admins Only", { status: 403 });
      }
      return response.data.data; // Return user data if admin
    } else {
      throw new Response("Error fetching users", { status: 500 });
    }
  } catch (error) {
    // If Axios returns an error response, handle it
    if (error.response) {
      throw new Response(error.response.data.message || "Unauthorized", {
        status: error.response.status || 401,
      });
    } else {
      throw new Response("Server Error", { status: 500 });
    }
  }
};
