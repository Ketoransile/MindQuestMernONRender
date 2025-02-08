import React from "react";
import Signup from "../components/Signup";

const Register = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen w-screen bg-cover bg-center px-36 pt-10  ">
      <div className="flex justify-center">
        <Signup />
      </div>
    </div>
  );
};

export default Register;
