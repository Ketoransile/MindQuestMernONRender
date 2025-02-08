import React, { useContext, useState } from "react";
import { IoSearch } from "react-icons/io5";
import UsersTable from "./DashboardComponents/UsersTable";
import { useLoaderData } from "react-router-dom";
import { AdminContext } from "@/context/AdminPageContext";
import useAdminStore from "../../store/useAdminStore";

const Users = () => {
  // const loaderData = useLoaderData();
  const { users } = useAdminStore();
  const removeUser = useAdminStore((state) => state.removeUser);
  const initialUsersData = users || [];
  // console.log("Users from users page", users);

  return (
    <div className="flex flex-col p-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-white">People</h1>
        <p className="text-md text-slate-400">
          View all of your users information
        </p>
        {/* <div className="flex items-center gap-2 mt-4 border border-slate-700  rounded-full px-4 w-1/3 ">
          <IoSearch className="text-slate-300  " size={20} />
          <input
            type="text"
            name="searchname"
            placeholder="Search...."
            className=" w-full focus:outline-none text-slate-400 bg-transparent placeholder:text-slate-400 p-2"
          />
        </div> */}
      </div>
      <div className="">
        <UsersTable users={users} removeUser={removeUser} />
      </div>
    </div>
  );
};

export default Users;
