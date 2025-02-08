import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <div className="flex justify-between items-center text-white  ">
      <NavLink className="text-2xl text-white ">MindQuest</NavLink>
      <div className="flex gap-4 ">
        {/* <NavLink className="">Home</NavLink>
        <NavLink></NavLink>
        <NavLink>About</NavLink> */}
      </div>
      <div className="flex gap-6 items-center ">
        <NavLink to="/login" className=" bg-transparent p-4 ">
          Login
        </NavLink>
        <Button className="rounded-xl p-4  bg-blue-600 ">
          <NavLink to="/signup" className="      ">
            Sign up
          </NavLink>
        </Button>
      </div>
    </div>
  );
};

export default Header;
