import React, { useContext } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div
        style={{
          backgroundImage: `url(https://demo.hasthemes.com/shopify/p2/img/flone/hero-bg.jpg)`,
        }}
        className="h-screen w-full  bg-left bg-cover bg-black bg-no-repeat  text-white  gap-5 flex flex-col items-center justify-center"
      >
        <h1 className="text-9xl tracking-wide text-[#FAFAF7] font-extrabold uppercase">
          Baniya Store
        </h1>
        <h3 className="text-7xl font-bold text-[#EAEAEA] tracking-wide">
          Sasta. Tikau. Apna.
        </h3>

        <Link
          className="bg-[#FAFAF7] text-[#111111] px-8 py-5 text-2xl mt-2 font-bold tracking-wider cursor-pointer active:scale-95"
          to={"/products"}
        >
          {" "}
          Explore Products
        </Link>
      </div>
    </>
  );
};

export default Home;
