import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { product } from "../context/ProductContext";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = () => {
  const allProducts = useContext(product);
  const { id } = useParams();

  const selectedProduct = allProducts.find((elem) => id == elem.id);
  if (!selectedProduct) {
    return (
      <div>
        <Navbar />
        <h2 style={{ textAlign: "center", marginTop: "50px" }}>
          Loading product...
        </h2>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="flex m-10 my-20   justify-around">
        <div className="img  h-[50vh]  w-[50%] flex items-center justify-center">
          <img
            className="h-full object-center object-cover"
            src={selectedProduct.image}
            alt=""
          />
        </div>
        <div className="content w-[50%]   ">
          <div className="flex flex-col gap-10 w-[70%]">
            <h6 className="text-xl opacity-65">{selectedProduct.category}</h6>
            <h1 className="text-3xl tracking-wider">{selectedProduct.title}</h1>

            <div className="flex gap-1 tracking-wider text-2xl">
              <h1>Description:</h1>

              <h2 className="line-clamp-4">{selectedProduct.description}</h2>
            </div>

            <h1 className="text-3xl p-2">${selectedProduct.price}</h1>

            <button className="cursor-pointer active:scale-95 border px-8 py-3 text-xl btn text-white bg-black w-fit">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
