import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import DashboardHome from "../page/DashboardHome/DashboardHome";
import Earnings from "../page/Earnings/Earnings";
import ForgetPassword from "../page/Auth/ForgetPassword/ForgetPassword";
import SignIn from "../page/Auth/SignIn/SignIn";
import Otp from "../page/Auth/Otp/Otp";
import NewPassword from "../page/Auth/NewPassword/NewPassword";
import PersonalInformationPage from "../page/PersonalInformation/PersonalInformationPage";
import SettingsPage from "../page/Settings/SettingsPage";
import PrivacyPolicyPage from "../page/PrivacyPolicy/PrivacyPolicyPage";
import TermsconditionPage from "../page/TermsCondition/TermsconditionPage";
import AboutUsPage from "../page/AboutUs/AboutUsPage";
import BudboxesPage from "../page/Budboxes/BudboxesPage";
import UsersPage from "../page/Users/UsersPage";
import EditBoxPage from "../page/EditBox/EditBoxPage";
import AddBoxPage from "../page/AddBox/AddBoxPage";
import ItemsPage from "../page/Items/ItemsPage";
import AddItemPage from "../page/AddItem/AddItemPage";
import EditItemPage from "../page/EditItem/EditItemPage";
import OrdersPage from "../page/Orders/OrdersPage";
import BudBoxDetails from "../component/Main/Budboxes/BudBoxDetails";
import Notification from "../component/Main/Notification/Notification";
import EditPersonalInformationPage from "../page/EditPersonalInformationPage/EditPersonalInformationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <h1>Error</h1>,
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "budboxes",
        element: <BudboxesPage />,
      },
      {
        path: "budboxes/budboxes-details/:id",
        element: <BudBoxDetails/>
      },
      {
        path: "budboxes/add-box",
        element: <AddBoxPage />,
      },
      {
        path: "budboxes/edit-box/:id",
        element: <EditBoxPage />,
      },
      {
        path: "items",
        element: <ItemsPage />,
      },
      {
        path: "items/add-item",
        element: <AddItemPage />,
      },
      {
        path: "items/edit-item/:id",
        element: <EditItemPage />,
      },
      {
        path: "earnings",
        element: <Earnings />,
      },
      {
        path: '/orders',
        element: <OrdersPage/>
      },
      {
        path: "personal-info",
        element: <PersonalInformationPage />,
      },
      {
        path:"edit-personal-info",
        element:<EditPersonalInformationPage/>
      },
      {
        path: "/notification",
        element: <Notification/>
      },
      {
        path: "settings",
        element: <SettingsPage />,
      },
      {
        path: "settings/privacy-policy",
        element: <PrivacyPolicyPage />,
      },
      {
        path: "settings/terms-conditions",
        element: <TermsconditionPage />,
      },
      {
        path: "settings/about-us",
        element: <AboutUsPage />,
      },
    ],
  },
  {
    path: "/auth",
    errorElement: <h1>Auth Error</h1>,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "otp/:email",
        element: <Otp />,
      },
      {
        path: "new-password/:email",
        element: <NewPassword />,
      },
    ],
  },
]);

export default router;
