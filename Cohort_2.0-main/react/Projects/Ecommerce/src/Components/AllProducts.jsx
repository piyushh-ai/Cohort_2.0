import React, { useContext } from "react";
import Navbar from "./Navbar";
import { product } from "../context/ProductContext";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const allProducts = useContext(product);

  if (allProducts.length === 0) {
    return (
      <div>
        <Navbar />
        <h2 style={{ textAlign: "center", marginTop: "50px" }}>
          Loading products...
        </h2>
      </div>
    );
  }

  return (
    <div className="text-black ">
      <Navbar />
      <div className="flex flex-wrap justify-center gap-15  p-10 w-full">
        {allProducts.map((elem, idx) => {
          return (
            <div
              key={idx}
              className="product rounded-2xl flex bg-[#F2F2F2]  w-75 py-5 px-10"
            >
              <Link to={`/products/${elem.id}`}>
                <div className="flex w-full flex-col gap-2 justify-center">
                  <img
                    className="w-full p-5 h-60 object-center object-contain"
                    src={elem.image}
                    alt=""
                  />
                  <h6 className="opacity-60 ">{elem.category}</h6>
                  <h1 className="text-lg line-clamp-2 title ">
                    {elem.title}
                  </h1>
                  <h1 className="text-lg">${elem.price}</h1>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllProducts;
