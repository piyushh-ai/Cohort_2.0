import React from "react";

const Founder = () => {
  return (
    <div className="h-[70vh] w-full bg-[#F2EBE8] text-black ">
      <div className="h-full w-full flex border-b">
        <div
          style={{ fontFamily: "Helvetica" }}
          className="flex-col gap-5 w-1/2 items-start px-20 justify-center flex border-r"
        >
            <p className="font-sans text-xl font-light">Who is Barberian?</p>
          <h1 className="text-3xl">
            Founded and crafted by Jorge Viota, championing premium ingredients.
          </h1>
          <h3 className="text-xl">
            Jorge Viota crafts each product using premium ingredients & native Australian botanicals and natural oils. His dedication ensures low-toxicity, high-quality grooming essentials that nourish, revitalise, and elevate the user's daily routine, embodying true holistic care. The Barberian product range has been 12 years in the making.
          </h3>
          <button className="button font-sans border px-2 capitalize p-0.5 font-medium">
            about us
          </button>
        </div>
        <div className="h-full w-1/2 border-l">
          <img
            className="h-full w-full object-center object-cover"
            src="https://framerusercontent.com/images/TehxLYpBb3uuAuhaVxDAs0i8Kh4.jpg?scale-down-to=1024&width=4096&height=2731"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Founder;
