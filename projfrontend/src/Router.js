import React from "react";
import {
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./core/Home";
import Layout from "./core/Layout";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
import AdminRoutes from "./auth/helper/AdminRoutes";
import ProtectedRoutes from "./auth/helper/ProtectedRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";
import ErrorBoundary from "./core/ErrorBoundary";
import Checkout from "./core/Checkout";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorBoundary />}>
      <Route path="" element={<Home />} />
      <Route path="cart" element={<Outlet />}>
        <Route path="checkout" element={<Checkout />} />
      </Route>
      <Route path="signup" element={<Signup />} />
      <Route path="signin" element={<Signin />} />
      <Route path="user" element={<ProtectedRoutes />}>
        <Route path="dashboard" element={<UserDashBoard />} />
      </Route>
      <Route path="admin" element={<AdminRoutes />}>
        <Route path="dashboard" element={<AdminDashBoard />} />
      </Route>
    </Route>
  )
);

export default Router;
