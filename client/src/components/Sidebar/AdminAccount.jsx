import React from "react";

const AdminAccount = ({
  adminName = "Abdi Sileshi",
  adminEmail = "abdi123@gmail.com",
}) => {
  return (
    <div className=" border-b mb-4 mt-2 pb-4 border-stone-300 ">
      <button className="flex p-0.5  rounded transition-colors relative gap-2 w-full items-center">
        <img
          src="/admin.jpg"
          alt="admin-img"
          className="size-8 rounded-full shrink-0  bg-blue-500"
        />
        <div className="text-start text-white ">
          <span className="text-sm font-bold block text-white">
            {adminName}
          </span>
          <span className="text-xs block text-slate-200 ">{adminEmail}</span>
        </div>
      </button>
    </div>
  );
};

export default AdminAccount;
