import { AdminContext } from "@/context/AdminPageContext";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const TotalCard = ({
  totalQuizes,
  totalUsers,
  isQuizesCard,
  isUsersCard,
  ...props
}) => {
  // console.log("TotalCard props:", props);
  // const { adminData } = useContext(AdminContext);
  // console.log("Admin data from context in totalcard component is", adminData);
  // const { quizes, categories, users } = adminData;
  // console.log(props);

  // console.log("Inside TotalCard - totalUsers:", totalUsers);
  // console.log("Inside TotalCard - isUsersCard:", isUsersCard);
  return (
    <div className="flex justify-between p-4  ">
      <div className="flex flex-col gap-6 ">
        <div className="flex items-center gap-4">
          {<props.icon />}
          <span className="font-semibold">{props.title}</span>
        </div>
        <span className="text-3xl font-bold">
          {isUsersCard ? totalUsers : totalQuizes}
        </span>
        <Link to={props.link} className="text-xs text-blue-300">
          View All
        </Link>
      </div>
      <div className="flex flex-col w-1/3">
        <div className="w-full h-[80px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart width={300} height={100} data={props.chartData}>
              {/* <Tooltip
                
              > */}
              <Tooltip
                contentStyle={{ background: "transparent", border: "none" }}
                labelStyle={{ display: "none" }}
                position={{ x: 40, y: 40 }}
              />
              <Line
                type="monotone"
                dataKey={props.dataKey}
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
              />
              {/* </Tooltip> */}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-lg text-green-400 font-bold">
            {props.percentage}%
          </span>
          <span className="text-slate-300 text-xs">this month</span>
        </div>
      </div>
    </div>
  );
};
export default TotalCard;
