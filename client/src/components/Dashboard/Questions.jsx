import React from "react";
import QuestionsTable from "./DashboardComponents/QuestionsTable";

const Questions = () => {
  return (
    <div className="flex flex-col p-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-white">Questions</h1>
        <p className="text-md text-slate-400">View all of your questions</p>
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
        <QuestionsTable />
      </div>
    </div>
  );
};

export default Questions;
