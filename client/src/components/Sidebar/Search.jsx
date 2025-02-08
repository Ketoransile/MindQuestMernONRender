import React from "react";
import { IoSearch } from "react-icons/io5";
import { MdKeyboardCommandKey } from "react-icons/md";

const Search = () => {
  return (
    <div className="flex bg-slate-700 rounded-md px-2 p-1 items-center gap-2">
      <IoSearch size={20} className="text-slate-400" />
      <input
        type="text"
        name="search"
        placeholder="Search"
        className="w-full placeholder:text-slate-600 focus:outline-none "
      />
    </div>
  );
};

export default Search;
