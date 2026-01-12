import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-25 bg-zinc-700 text-white h-20">
      <h1 className="text-2xl font-bold tracking-wider">BaniyaStore</h1>
      <div className="flex justify-center items-center gap-5">
        <Link className="text-2xl hover:underline " to="/">
          Home
        </Link>
        <Link className="text-2xl hover:underline " to="/products">
          All Products
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
