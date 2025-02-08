import TotalCard from "./DashboardComponents/TotalCard";
import PassFailCard from "./DashboardComponents/PassFailCard";
import PieChartCategory from "./DashboardComponents/PieChartCategory";
import {
  barChartCategoryPassFail,
  categoryPiChart,
  chartBoxQuizes,
  chartBoxUsers,
} from "../../utils/data";
import useAdminStore from "../../store/useAdminStore";

const Overview = () => {
  const { quizzes, users } = useAdminStore();

  // Fallback values to prevent errors
  const totalQuizzes = quizzes?.length || 0;
  const totalUsers = users?.length || 0;

  return (
    <div className="text-white grid grid-cols-3 gap-10 auto-rows-[180px] p-4">
      <div className="p-2 rounded-xl border border-slate-700">
        <TotalCard
          {...chartBoxUsers}
          totalUsers={totalUsers}
          isUsersCard={true}
        />
      </div>
      <div className="rounded-xl border border-slate-800 row-span-2 col-span-2">
        <PassFailCard {...barChartCategoryPassFail} />
      </div>
      <div className="p-2 rounded-xl border border-slate-800">
        <TotalCard
          {...chartBoxQuizes}
          totalQuizes={totalQuizzes}
          isQuizesCard
        />
      </div>
      <div className="p-2 rounded-xl border border-slate-800 row-span-1 col-span-3">
        <PieChartCategory {...categoryPiChart} />
      </div>
    </div>
  );
};

export default Overview;
