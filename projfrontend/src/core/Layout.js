import React from "react";
import Menu from "./Menu";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="bg-dark">
      <Menu />
      <Outlet />
      <footer className="footer bg-dark mt-auto py-3">
        <div className="container-fluid bg-success text-white text-center py-3">
          <h4>If you got any question feel free to reach out!</h4>
          <button className="btn btn-warning btn-lg">Contact Us</button>
        </div>
        <div className="container">
          <span className="text-muted">
            An amazing <span className="text-white"> MERN </span> bootcamp
          </span>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
