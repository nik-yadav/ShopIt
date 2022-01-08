import React from "react";
import "../styles.css";
import { API } from "../backend.js";
import Base from "./Base";

const Home = () => {
  console.log("API is", API);

  return (
    <Base title="Home">
      <h1 className="text-white">Hello front end</h1>
    </Base>
  );
};

export default Home;
