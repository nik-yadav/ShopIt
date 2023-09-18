import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./core/Home";
import Signin from "./user/Signin";
import Signup from "./user/Signup";
// import AdminRoute from "./auth/helper/AdminRoutes";
// import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashBoard from "./user/UserDashBoard";
import AdminDashBoard from "./user/AdminDashBoard";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "user",
        children: [
          {
            path: "dashboard",
            element: <UserDashBoard />,
          },
        ],
      },
      {
        path: "admin",
        children: [
          {
            path: "dashboard",
            element: <AdminDashBoard />,
          },
        ],
      },
    ],
  },
]);

// v4

// const Router = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route exact path="/" component={Home} />
//         <Route exact path="/signup" component={Signup} />
//         <Route exact path="/signin" component={Signin} />
//         <PrivateRoute exact path="/user/dashboard" component={UserDashBoard} />
//         <AdminRoute exact path="/admin/dashboard" component={AdminDashBoard} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// const router = createBrowserRouter()

export default Router;
