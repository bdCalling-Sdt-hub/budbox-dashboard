import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import DashboardHome from "../page/DashboardHome/DashboardHome";
import Users from "../page/Users/Users";
import Earnings from "../page/Earnings/Earnings";
import Settings from "../page/Settings/Settings";
import ForgetPassword from "../page/Auth/ForgetPassword/ForgetPassword";
import SignIn from "../page/Auth/SignIn/SignIn";
import Otp from "../page/Auth/Otp/Otp";
import NewPassword from "../page/Auth/NewPassword/NewPassword";
import CategoryPage from "../page/Category/CategoryPage";
import AddCategoryPage from "../page/AddCategory/AddCategoryPage";
import EditCategory from "../component/Main/EditCategory/EditCategory";

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
        element: <CategoryPage />
      },
      {
        path: "category/add-category/:id",
        element: <AddCategoryPage />

      },
      {
        path: "category/edit-category/:id",
        element: <EditCategory />
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