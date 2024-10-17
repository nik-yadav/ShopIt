import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "./index";

const ProtectedRoutes = () => {
  const authenticated = isAuthenticated();
  const state = useLocation();

  if (!authenticated) {
    return <Navigate to="/signin" state={state} />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
