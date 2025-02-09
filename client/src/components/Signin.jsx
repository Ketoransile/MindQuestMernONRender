import { Form, Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import FormRow from "./FormRow";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const [errors, SetErrors] = useState(null);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formSubmissionData = new FormData();
    formSubmissionData.append("email", formData.email);
    formSubmissionData.append("password", formData.password);

    // console.log("Datas to be submitted for login are ", formSubmissionData);
    // console.log([...formSubmissionData.entries()]);
    // console.log("data to be submitted is:", formData);
    try {
      setLoading(true);
      const response = await axios.post(
        `/api/v1/auth/login`,
        formSubmissionData,
        {
          withCredentials: true, // Include credentials
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("response is ", response);
      if (response.data.success) {
        // console.log("Successfully logged in", response);
        // localStorage.setItem("token", response.data.token);
        setLoading(false);
        toast.success("Logged in successfully");
        if (response.data.data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/users");
        }
      } else {
        if (Array.isArray(response.data.errors)) {
          response.data.errors.forEach((error) => toast.error(error));
        } else {
          // Handle the case where errors is not an array (optional)
          toast.error("An error occurred during registration");
        }
      }
    } catch (error) {
      // console.log("Error in signin", error);
      SetErrors("Error while logging in");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="bg-white border border-slate-400 rounded-2xl flex flex-col gap-2 items-center  max-lg:px-8 px-20 pt-6 pb-4">
    <div className="bg-white border border-slate-400 rounded-2xl flex flex-col gap-8  items-center   px-20  pt-6 pb-4 shadow-xl">
      <h1 className="text-2xl text-slate-600 font-semibold mb-10">
        Welcome Back
      </h1>
      <div className="flex flex-col justify-center items-center  text-slate-500 mb-4">
        <h2 className="text-xl max-lg:text-lg text-center">
          Glad to see you again!
        </h2>
        <p className="max-lg:text-lg text-center">
          Log into your account below
        </p>
      </div>

      {/* Google Login Button */}

      {/* <Link
          to="/auth/google"
          className="flex items-center gap-4 border border-slate-200 px-6 py-3 rounded-md w-full justify-center text-sm text-slate-700 hover:bg-slate-100 transition"
        >
          <FcGoogle className="text-2xl" />
          Continue with Google
        </Link> */}

      {/* Email Form Row */}
      <Form method="post" onSubmit={handleSubmit}>
        <FormRow
          type="email"
          name="email"
          value={formData.email}
          labelText="Email"
          onChange={handleInputChange}
        />

        <FormRow
          type="password"
          name="password"
          value={formData.password}
          labelText="Password"
          onChange={handleInputChange}
        />

        <button
          disabled={loading}
          type="submit"
          className="w-full mt-4 bg-blue-500 disabled:bg-blue-300 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
        >
          {loading ? "Signing you in ..." : "Sign in"}
        </button>
      </Form>

      <p className="text-sm text-slate-500 mt-4">
        Do not have an account?{" "}
        <Link to="/signup" className="text-blue-500 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Signin;
