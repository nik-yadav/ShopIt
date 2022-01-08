import React from "react";
// import { withRouter } from "react-router";
import { Link } from "react-router-dom";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#FFFFFF" };
  } else {
    return { color: "#d1d1d1" };
  }
};

const Menu = ({ history }) => (
  <div>
    <ul className="nav nav-tabs bg-dark">
      <li className="nav-item">
        <Link style={currentTab(history, "/")} className="nav-link" to="/">
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link
          style={currentTab(history, "/cart")}
          className="nav-link"
          to="/cart"
        >
          Cart
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/">
          A. Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Signup
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Signin
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/">
          Signout
        </Link>
      </li>
    </ul>
  </div>
);

export default Menu;
