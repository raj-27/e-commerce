import React from "react";
import { Product } from "../../components/Index";
import "./Home.scss";
const Home = () => {
  return (
    <>
      <div className="heading">Welcome to the Redux toolit store</div>
      <Product/>
    </>
  );
};

export default Home;
