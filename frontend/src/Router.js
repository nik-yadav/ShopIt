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
import Stripe from "./core/Stripe";
import ProductDescription from "./core/ProductDescription";
import Profile from "./admin/Profile";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import ManageOrders from "./admin/ManageOrders";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<ErrorBoundary />}>
      <Route path="" element={<Home />} />
      <Route path="product" element={<ProductDescription />} />
      <Route path="cart" element={<Outlet />}>
        {/* <Route path="checkout" element={<Outlet />}> */}
        <Route path="checkout" element={<Checkout />} />
        <Route path="pay" element={<Stripe />} />
        {/* </Route> */}
      </Route>
      <Route path="signup" element={<Signup />} />
      <Route path="signin" element={<Signin />} />
      <Route path="user" element={<ProtectedRoutes />}>
        <Route path="dashboard" element={<UserDashBoard />} />
      </Route>

      {/* admin routes */}
      <Route path="admin" element={<AdminRoutes />}>
        <Route path="dashboard" element={<AdminDashBoard />}>
          <Route path="" element={<Profile />} />
          <Route path="create" element={<Outlet />}>
            <Route path="category" element={<AddCategory />} />
            <Route path="product" element={<AddProduct />} />
          </Route>

          <Route path="manage" element={<Outlet />}>
            <Route path="products" element={<ManageProducts />} />
            <Route path="orders" element={<ManageOrders />} />
          </Route>
        </Route>
      </Route>
    </Route>
  )
);

export default Router;
