import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import DashboardHome from "../page/DashboardHome/DashboardHome";
import Users from "../page/Users/Users";
import Category from "../page/Category/Category";
import Earnings from "../page/Earnings/Earnings";
import Settings from "../page/Settings/Settings";
import ForgetPassword from "../page/Auth/ForgetPassword/ForgetPassword";
import SignIn from "../page/Auth/SignIn/SignIn";
import Otp from "../page/Auth/Otp/Otp";
import NewPassword from "../page/Auth/NewPassword/NewPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <h1>Error</h1>,
    children: [
      {
        index: true,
        element: <DashboardHome />
      },
      {
        path: "users",
        element: <Users />
      },
      {
        path: "category",
        element: <Category />
      },
      {
        path: 'earnings',
        element: <Earnings />

      },
      {
        path: 'settings',
        element: <Settings />
      }
    ]
  },
  {
    path: '/auth',
    errorElement: <h1>Auth Error</h1>,
    children: [
      {
        index: true,
        element: <SignIn />
      },
      {
        path: 'forget-password',
        element: <ForgetPassword />
      },
      {
        path: 'otp',
        element: <Otp />
      },
      {
        path: 'new-password',
        element: <NewPassword />
      }
    ]
  }
]);

export default router;