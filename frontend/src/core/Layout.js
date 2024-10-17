import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen justify-between">
      <Navbar cartState={[open, setOpen]} />
      <div className="p-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
