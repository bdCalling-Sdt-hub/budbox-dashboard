import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import DashboardHome from "../page/DashboardHome/DashboardHome";
import Users from "../page/Users/Users";
import Earnings from "../page/Earnings/Earnings";
import ForgetPassword from "../page/Auth/ForgetPassword/ForgetPassword";
import SignIn from "../page/Auth/SignIn/SignIn";
import Otp from "../page/Auth/Otp/Otp";
import NewPassword from "../page/Auth/NewPassword/NewPassword";
import CategoryPage from "../page/Category/CategoryPage";
import AddCategoryPage from "../page/AddCategory/AddCategoryPage";
import EditCategory from "../component/Main/EditCategory/EditCategory";
import PersonalInformationPage from "../page/PersonalInformation/PersonalInformationPage";
import SettingsPage from "../page/Settings/SettingsPage";
import PrivacyPolicyPage from "../page/PrivacyPolicy/PrivacyPolicyPage";
import TermsconditionPage from "../page/TermsCondition/TermsconditionPage";
import AboutUsPage from "../page/AboutUs/AboutUsPage";

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
        path: 'personal-info',
        element: <PersonalInformationPage />
      },
      {
        path: 'settings',
        element: <SettingsPage />
      },
      {
        path: 'settings/privacy-policy',
        element: <PrivacyPolicyPage />
      },
      {
        path: 'settings/terms-conditions',
        element: <TermsconditionPage />
      },
      {
        path: 'settings/about-us',
        element: <AboutUsPage />
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