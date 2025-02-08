import React from "react";
import Signup from "../components/Signup";
import Header from "../components/Header";

const Register = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen w-screen bg-cover bg-center px-36 max-lg:px-4  pt-10 ">
      <div className="flex flex-col max-lg:gap-24">
        <Header />
        <div className="flex justify-center">
          <Signup />
        </div>
      </div>
    </div>
  );
};

export default Register;
