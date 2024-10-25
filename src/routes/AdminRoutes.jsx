/* eslint-disable react/prop-types */
// AdminRoutes.js
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoutes = ({ children }) => {
  const { user } = useSelector((state) => state.auth);

  // Check if the user is an admin
  const isAdmin = user && user.role === "admin";

  // If not admin, redirect to the login page or unauthorized page
  if (!isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  // If admin, render the requested admin route component
  return <>{children}</>;
};

export default AdminRoutes;
