import React from "react";
import stockImg from "../assets/stock.avif";

const Stock = () => {
  const stock = [
    {
      image:
        "https://framerusercontent.com/images/JYCkEQKVSsIANNExltMW7ZIFg7E.png?scale-down-to=512&width=1417&height=1417",
      name: "Daily Conditioner",
    },
    {
      image:
        "https://framerusercontent.com/images/l1bIvNMYrOUnsntHXqNP67fyf8.png?scale-down-to=512&width=1417&height=1417",
      name: "Moisturising Shampoo",
    },
    {
      image:
        "https://framerusercontent.com/images/YmdcNkl6oRqa9fpINt9gYBKqN8.png?scale-down-to=512&width=1417&height=1417",
      name: "Moisturising Conditioner",
    },
    {
      image:
        "https://framerusercontent.com/images/l1bIvNMYrOUnsntHXqNP67fyf8.png?scale-down-to=512&width=1417&height=1417",
      name: "Daily Shampoo",
    },
    {
      image:
        "https://framerusercontent.com/images/puAlAva8MOQFnMtQfrdcAbdBNb0.png?scale-down-to=512&width=1417&height=1417",
      name: "Medium Hold Wax",
    },
  ];

  return (
    <div className="h-[120vh] w-full bg-[#F2EBE8] text-black border">
      <div className="h-[60%] w-full flex">
        <div className="h-full w-[45%] border">
          <img
            className="h-full w-full object-center object-cover"
            src={stockImg}
            alt=""
          />
        </div>
        <div
          style={{ fontFamily: "Helvetica" }}
          className="flex-col gap-5 w-[55%] items-start px-20 justify-center flex border"
        >
          <h1 className="text-3xl">
            Want to stock Barberian Men’s Grooming in your salon or barber shop?
          </h1>
          <h3 className="text-xl">
            Stock Barberian to offer your clients premium, low-toxicity grooming
            products. Crafted with care, our range enhances wellness and
            grooming experiences, with everyone who tries it raving about the
            results.
          </h3>
          <button className="button font-sans border px-2 capitalize p-0.5 font-medium">
            find out more
          </button>
        </div>
      </div>
      <div className="h-[40%]  w-full border flex">
        <div
          style={{ fontFamily: "Helvetica" }}
          className=" w-[25%] px-15 py-10 flex flex-col gap-10"
        >
          <div>
            <p className="font-sans py-2">"THE BARBERIAN MAN"</p>
            <h1 className="text-3xl">Our products speak for themselves!</h1>
            <h3 className="text-xl pt-2">
              All natural, and produced to blow you away, our products need to
              be seen and tried to be believed. We can guarantee that your
              customers will be coming back for me.
            </h3>
          </div>
          <div>
            <h1 className="text-xl">Want to find out for yourself?</h1>
            <button className="font-sans border px-2 mt-2 text-lg">
              view all
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center gap-15 px-5 h-full w-[75%]">
          {stock.map(function (elem) {
            return (
              <div className="flex flex-col items-center h-[75%]  ">
                <img
                  className="w-full border-b h-full object-center object-cover"
                  src={elem.image}
                  alt=""
                />
                <h1 className="pt-2 font-medium text-lg">{elem.name}</h1>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Stock;
