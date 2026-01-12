import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import AllProducts from "./Components/AllProducts";
import Navbar from "./Components/Navbar";
import ProductDetail from "./Components/ProductDetail";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/products/:id" element={<ProductDetail />} />
      </Routes>
    </div>
  );
};

export default App;
