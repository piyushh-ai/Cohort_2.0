import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const product = createContext();

const ProductContext = (props) => {
  const [allProducts, setAllProducts] = useState([]);

  async function productApi() {
    let response = await axios.get("https://fakestoreapi.com/products");
    setAllProducts(response.data);
  }

  useEffect(() => {
    productApi();
  }, []);

  return (
    <product.Provider value={allProducts}>
      {props.children}
    </product.Provider>
  );
};

export default ProductContext;
