import React from "react";
import AdminAccount from "./AdminAccount";
import Search from "./Search";
import { IoIosLogOut } from "react-icons/io";
import RouteSelect from "./RouteSelect";
import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { AlertDialogFooter, AlertDialogHeader } from "../ui/alert-dialog";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminSidebar = ({ onItemClick }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      // Change this to POST
      const loggedOut = await axios.post(
        `/api/v1/auth/logout`,
        {},
        { withCredentials: true }
      );
      console.log("Loggedout", loggedOut);
      if (!loggedOut) {
        toast.error("Failed to logout");
      }
      navigate("/"); // Redirect to the home page or login page
      toast.success("Logged out successfully");
      localStorage.removeItem("token"); // Clear client-side token if it's saved in localStorage
    } catch (error) {
      toast.error("Failed to logout");
      console.error("Error while logging out", error);
    }
  };

  return (
    <div className=" overflow-y-auto sticky top-4 h-[calc(100vh-32px-48px)]">
      {/* Main part */}
      <div className="flex flex-col">
        <AdminAccount />
        {/* <Search /> */}
        <RouteSelect onItemClick={onItemClick} />

        <div className="mt-10 p-2 ">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">
                <IoIosLogOut className="text-black" />
                Logout
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Are you sure you want to log out?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleLogout}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      {/* bottom part */}
      <div className=""></div>
    </div>
  );
};

export default AdminSidebar;
