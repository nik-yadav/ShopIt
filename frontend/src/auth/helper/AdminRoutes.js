import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "./index";

const AdminRoute = () => {
  const state = useLocation();

  if (!isAuthenticated() || typeof isAuthenticated().user === "undefined") {
    return <Navigate to="/signin" state={state} />;
  }

  if (isAuthenticated().user.role !== 1) {
    return <Navigate to="/signin" state={state} />;
  }

  return <Outlet />;
};

export default AdminRoute;
