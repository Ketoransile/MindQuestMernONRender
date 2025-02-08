import axios from "axios";
import React from "react";
import { NavLink, redirect, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { AlertDialogFooter, AlertDialogHeader } from "./ui/alert-dialog";

const UsersPageHeader = () => {
  const navigate = useNavigate();
  const handleLogoutClick = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/logout`,
        {},
        { withCredentials: true }
      );
      // console.log("response from logout button is ", response);
      if (response.data.data.data === "success") {
        toast.success("Logged Out Sucessfully");
        return navigate("/");
      } else {
        toast.error("Logout Failed");
      }
    } catch (error) {
      toast.error();
      // console.error("error while logging out", error);
    }
  };
  return (
    <div className="flex justify-between items-center text-white  ">
      <NavLink className="text-2xl text-white ">MindQuest</NavLink>
      <div className="flex gap-4 ">
        <NavLink className="">Home</NavLink>
        <NavLink></NavLink>
        <NavLink>About</NavLink>
      </div>
      <div className="flex gap-4">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <div className="flex gap-6 items-center ">
              <Button className=" bg-transparent p-4 ">Logout</Button>{" "}
            </div>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to log out?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogoutClick}>
                {" "}
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <img src="/admin.jpg" alt="user-img" className="size-12 rounded-full" />
      </div>
    </div>
  );
};

export default UsersPageHeader;
