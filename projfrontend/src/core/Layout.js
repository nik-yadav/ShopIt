import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Counter from "../redux/counter";

function Layout() {
  return (
    <>
      <Navbar />
      <Counter />
      <Outlet />
      <Footer />
      {/* <footer className="footer bg-gray-900 mt-auto py-3">
        <div className="container w-full bg-green-800 text-white text-center py-3">
          <h4>If you got any question feel free to reach out!</h4>
          <button className="bg-orange-500 hover:bg-blue-700 text-white font-bold px-1 rounded">
            Contact Us
          </button>
        </div>
        <div className="container">
          <span className="text-muted">
            An amazing <span className="text-white"> MERN </span> bootcamp
          </span>
        </div>
      </footer> */}
    </>
  );
}

export default Layout;
