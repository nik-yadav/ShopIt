import React, { Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper";

// const currentTab = (history, path) => {
//   if (history.location.pathname === path) {
//     return { color: "#2ecc72" };
//   } else {
//     return { color: "#FFFFFF" }; // color: #EC3D9F
//   }
// };

const Menu = () => {
  const navigate = useNavigate();
  return (
    <div>
      <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
          <NavLink
            style={({ isActive }) => {
              return {
                color: isActive ? "#2ecc72" : "#FFFFFF",
              };
            }}
            className="nav-link"
            to="/"
          >
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            style={({ isActive }) => {
              return {
                color: isActive ? "#2ecc72" : "#FFFFFF",
              };
            }}
            className="nav-link"
            to="/cart"
          >
            Cart
          </NavLink>
        </li>
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <NavLink
              style={({ isActive }) => {
                return {
                  color: isActive ? "#2ecc72" : "#FFFFFF",
                };
              }}
              className="nav-link"
              to="/user/dashboard"
            >
              U. Dashboard
            </NavLink>
          </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <NavLink
              style={({ isActive }) => {
                return {
                  color: isActive ? "#2ecc72" : "#FFFFFF",
                };
              }}
              className="nav-link"
              to="/admin/dashboard"
            >
              A. Dashboard
            </NavLink>
          </li>
        )}
        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <NavLink
                style={({ isActive }) => {
                  return {
                    color: isActive ? "#2ecc72" : "#FFFFFF",
                  };
                }}
                className="nav-link"
                to="/signup"
              >
                Signup
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                style={({ isActive }) => {
                  return {
                    color: isActive ? "#2ecc72" : "#FFFFFF",
                  };
                }}
                className="nav-link"
                to="/signin"
              >
                Signin
              </NavLink>
            </li>
          </Fragment>
        )}
        {isAuthenticated() && (
          <li className="nav-item">
            <span
              className="nav-link text-warning"
              onClick={() => {
                signout(() => {
                  navigate("/");
                });
              }}
            >
              Signout
            </span>
            {/* <Link
            style={currentTab(history, "/signout")}
            className="nav-link"
            to="/signout"
          >
            Signout
          </Link> */}
          </li>
        )}
      </ul>
    </div>
  );
};

export default Menu;
