import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PassFailCard = (props) => {
  return (
    <div className="flex flex-col gap-4 w-full h-full justify-center items-center">
      <h1 className="text-xl text-center font-bold">Quiz Pass vs Fail</h1>
      <div className="w-full h-[400px] max-lg:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={400}
            height={200}
            data={props.barChartCategoryPassFailData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="passed"
              fill="#8884d8"
              activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
            <Bar
              dataKey="failed"
              fill="#82ca9d"
              activeBar={<Rectangle fill="gold" stroke="purple" />}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PassFailCard;
