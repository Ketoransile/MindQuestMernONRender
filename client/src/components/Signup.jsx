import { FcGoogle } from "react-icons/fc";
import { Form, Link, useNavigate, useNavigation } from "react-router-dom";
import FormRow from "./FormRow";
import ImageUploader from "./ImageUploader";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState(null);
  const navigation = useNavigation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formSubmissionData = new FormData();
    formSubmissionData.append("username", formData.username);
    formSubmissionData.append("email", formData.email);
    formSubmissionData.append("password", formData.password);

    if (avatar) {
      formSubmissionData.append("avatar", avatar);
    }
    // console.log([...formSubmissionData.entries()]);
    // console.log("data to be submitted is:", formData);
    try {
      const response = await axios.post(
        `/api/v1/auth/register`,
        formSubmissionData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log("response is", response);
      if (response.data.success) {
        // console.log("User created successfully", response.data);
        toast.success("Signed up successfully");

        navigate("/login");
      } else {
        setError(
          response.data.errors || "An error occurred during registration"
        );
        if (Array.isArray(response.data.errors)) {
          response.data.errors.forEach((error) => toast.error(error));
        } else {
          // Handle the case where errors is not an array (optional)
          toast.error("An error occurred during registration");
        }
      }
    } catch (error) {
      // console.log("Error while signing up", error);
      setError("An error occurred during registration");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-400 rounded-2xl flex flex-col gap-2 items-center justify-center px-20 pt-6  mx-auto pb-4">
      <h1 className="text-4xl text-slate-600 font-semibold mb-10">Sign Up</h1>
      <Link
        // to="/auth/google"
        className="flex items-center gap-4 border border-slate-200 px-6 py-3 rounded-md w-full justify-center text-sm text-slate-700 hover:bg-slate-100 transition"
      >
        <FcGoogle className="text-2xl" />
        Continue with Google
      </Link>
      <p className="text-slate-400">OR</p>
      <Form onSubmit={handleSubmit} method="post">
        <FormRow
          type="text"
          name="username"
          value={formData.username}
          labelText="Username"
          onChange={handleInputChange}
        />
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
        {/* <FormRow type="file" name="avatar" labelText="Profile Image" />{" "} */}
        <ImageUploader onFileSelection={setAvatar} value={formData.avatar} />
        <button
          disabled={loading}
          className="w-full bg-blue-500 disabled:bg-blue-300 text-white font-semibold py-2 mt-2 rounded-md hover:bg-blue-600 transition"
          type="submit"
        >
          {loading ? "Submitting..." : "Sign Up"}
        </button>
      </Form>
      <p className="text-sm text-slate-500 mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
