import { HiUsers } from "react-icons/hi2";
import { FaQuestionCircle } from "react-icons/fa";
import { MdOutlineQuiz } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
export const chartBoxUsers = {
  icon: HiUsers,
  title: "Total User",
  link: "/admin/users",
  number: "10",
  dataKey: "users",
  percentage: 45,
  chartData: [
    { name: "Sun", users: 400 },
    { name: "Mon", users: 600 },
    { name: "Tue", users: 500 },
    { name: "Wed", users: 700 },
    { name: "Thu", users: 500 },
    { name: "Fri", users: 400 },
    { name: "Sat", users: 450 },
  ],
};

export const chartBoxQuizes = {
  icon: MdOutlineQuiz,
  title: "Total Quizes",
  link: "/admin/quizes",
  number: "6",
  dataKey: "quizes",
  percentage: 60,
  chartData: [
    { name: "Sun", quizes: 400 },
    { name: "Mon", quizes: 600 },
    { name: "Tue", quizes: 500 },
    { name: "Wed", quizes: 700 },
    { name: "Thu", quizes: 500 },
    { name: "Fri", quizes: 400 },
    { name: "Sat", quizes: 450 },
  ],
};
export const chartBoxQuestions = {
  icon: FaQuestionCircle,
  title: "Total Questions",
  link: "/admin/questions",
  number: "525,522",
  dataKey: "questions",
  percentage: 80,
  chartData: [
    { name: "Sun", questions: 400 },
    { name: "Mon", questions: 600 },
    { name: "Tue", questions: 500 },
    { name: "Wed", questions: 700 },
    { name: "Thu", questions: 500 },
    { name: "Fri", questions: 400 },
    { name: "Sat", questions: 450 },
  ],
};
export const chartBoxCategories = {
  icon: BiCategory,
  title: "Total Categories",
  link: "/admin/categories",
  number: "4",
  dataKey: "categories",
  percentage: 50,
  chartData: [
    { name: "Sun", categories: 400 },
    { name: "Mon", categories: 600 },
    { name: "Tue", categories: 500 },
    { name: "Wed", categories: 700 },
    { name: "Thu", categories: 500 },
    { name: "Fri", categories: 400 },
    { name: "Sat", categories: 450 },
  ],
};

export const barChartCategoryPassFail = {
  barChartCategoryPassFailData: [
    { name: "Math", passed: 40, failed: 10 },
    { name: "Science", passed: 35, failed: 15 },
    { name: "History", passed: 20, failed: 25 },
    { name: "Languages", passed: 30, failed: 10 },
    { name: "Riddles", passed: 30, failed: 10 },
    { name: "Art", passed: 30, failed: 10 },
  ],
};

export const categoryPiChart = {
  data: [
    { name: "Math", value: 5 },
    { name: "Science", value: 10 },
    { name: "History", value: 20 },
    { name: "Languages", value: 4 },
    { name: "Riddles", value: 6 },
    { name: "Art", value: 15 },
  ],
};
