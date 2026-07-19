import React from "react";

const page = async () => {
  let res = await fetch("https://fakestoreapi.com/products");
  let products = await res.json();

  return (
    <div>
      {products.map((e) => {
        return <h2 key={e.id}>{e.title}</h2>;
      })}
    </div>
  );
};

export default page;
