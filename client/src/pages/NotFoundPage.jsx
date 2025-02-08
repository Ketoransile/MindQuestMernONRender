import { Button } from "@/components/ui/button";
import React from "react";
import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <img
        src="/src/assets/notFound.svg"
        alt="error"
        className="w-screen h-2/3 bg-cover"
      />
      <Button className="bg-blue-400 p-4 rounded-xl text-white">
        <NavLink to="/">Back To Home</NavLink>
      </Button>
    </div>
  );
};

export default NotFoundPage;
