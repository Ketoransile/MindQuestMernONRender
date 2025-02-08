import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UsersPage from "./pages/UsersPage";
import AdminPage from "./pages/AdminPage";
import Quizes from "./components/Dashboard/Quizes";
import Categories from "./components/Dashboard/Categories";
import Users from "./components/Dashboard/Users";
import Overview from "./components/Dashboard/Overview";
import Newquiz from "./components/Newquiz";
import QuizStart from "./components/Userspage/QuizStart";
import UsersResult from "./components/Userspage/UsersResult";
import { quizDataLoader } from "./loaders/quizLoader";

import adminPageLoader from "./loaders/adminPageLoader";
import Unauthorized from "./components/Unauthorized";
import usersPageLoader from "./loaders/UsersPageLoader";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: <Register />,
    errorElement: <Error />,
  },
  {
    path: "/users",
    element: <UsersPage />,
    loader: usersPageLoader,
    errorElement: <Error />,
    children: [
      {
        path: "start-quiz",
        // loader: quizDataLoader,
        element: <QuizStart />,
        errorElement: <Error />,
      },
    ],
  },
  {
    path: "/users/my-result",
    element: <UsersResult />,
    errorElement: <Error />,
  },
  {
    path: "unauthorized",
    element: <Unauthorized />,
    error: <Error />,
  },
  {
    path: "/admin",
    element: <AdminPage />,
    loader: adminPageLoader,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <Navigate to="/admin/overview" />,
        errorElement: <Error />,
      },
      {
        path: "/admin/overview",
        element: <Overview />,
        errorElement: <Error />,
      },
      {
        path: "/admin/quizzes",
        element: <Quizes />,
        // loader: adminquizPageLoader,
        errorElement: <Error />,
        children: [
          {
            path: "newquiz",
            element: <Newquiz />,
            // loader: adminCategoriesPageLoader,
            errorElement: <Error />,
          },
        ],
      },

      {
        path: "/admin/categories",
        element: <Categories />,
        // loader: adminCategoriesPageLoader,
        errorElement: <Error />,
      },
      {
        path: "/admin/users",
        element: <Users />,
        // loader: adminPageUsersSectionLoader,
        errorElement: <Error />,
      },
    ],
  },
  {
    path: "/not-found",
    element: <NotFoundPage />,
    errorElement: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
