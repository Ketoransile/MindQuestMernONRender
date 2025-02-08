import React from "react";
import Signin from "../components/Signin";

const Login = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-screen w-screen bg-cover bg-center px-36 pt-10  ">
      <div className="flex justify-center w-full">
        <Signin />
      </div>
    </div>
  );
};

export default Login;
