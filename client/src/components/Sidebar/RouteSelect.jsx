import React, { useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { MdQuiz } from "react-icons/md";
import { CiCircleQuestion } from "react-icons/ci";
import { BiCategory } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";

const RouteSelect = ({ onItemClick }) => {
  const location = useLocation();
  const [selected, setSelected] = useState("");
  const handleSelected = (title) => {
    setSelected(title);
    onItemClick();
  };
  return (
    <div className="flex flex-col gap-4 mt-10">
      <Routes
        title="Overview"
        iconName={IoHome}
        selected={location.pathname === "/admin/overview"}
        onClick={() => handleSelected("Overview")}
        to="/admin/overview"
      />
      <Routes
        title="Quizzes"
        iconName={MdQuiz}
        selected={location.pathname === "/admin/quizzes"}
        onClick={() => handleSelected("Quizzes")}
        to="/admin/quizzes"
      />

      <Routes
        title="Categories"
        iconName={BiCategory}
        selected={location.pathname === "/admin/categories"}
        onClick={() => handleSelected("Categories")}
        to="/admin/categories"
      />
      <Routes
        title="Users"
        iconName={FaUsers}
        selected={location.pathname === "/admin/users"}
        onClick={() => handleSelected("Users")}
        to="/admin/users"
      />
    </div>
  );
};

// const Routes = ({ iconName: Icon, title, to, selected, onClick }) => {
//   return (
//     <Link
//       to={to}
//       className={` p-2 rounded-lg ${
//         selected ? "bg-blue-800" : "bg-transparent"
//       }`}
//       onClick={onClick}
//     >
//       <div className="flex gap-4 items-center">
//         <Icon className={` ${selected ? "text-black" : "text-white"} `} />
//         <span
//           className={` "text-sm text-slate-200 ${
//             selected ? "text-white" : "text-slate-400"
//           }`}
//         >
//           {title}
//         </span>
//       </div>
//     </Link>
//   );
// };
// export default RouteSelect;
const Routes = ({ iconName: Icon, title, to, selected, onClick }) => {
  const navigate = useNavigate();

  return (
    <button
      className={`p-2 rounded-lg ${selected ? "bg-blue-800" : "bg-transparent"}`}
      onClick={(e) => {
        e.preventDefault();
        onClick();
        navigate(to);
      }}
    >
      <div className="flex gap-4 items-center">
        <Icon className={`${selected ? "text-black" : "text-white"}`} />
        <span
          className={`text-sm ${selected ? "text-white" : "text-slate-400"}`}
        >
          {title}
        </span>
      </div>
    </button>
  );
};

export default RouteSelect;
