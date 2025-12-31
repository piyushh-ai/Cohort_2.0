import React from "react";
import heroImage from "../assets/hero.avif";

const Hero = () => {
  return (
    <div
      className="h-screen w-full bg-center bg-cover relative"
      style={{ backgroundImage: `url(${heroImage})` }}
    >

      <div className="absolute bottom-0 w-full p-12">
        <div className="w-100  flex flex-col gap-4  my-7">
          <h1 className="text-5xl w-80 font-bold leading-13">
            MASCULINTY REDEFINED
          </h1>
          <h4
            style={{ fontFamily: "Helvetica" }}
            className="text-xl  opacity-90 leading-6"
          >
            Celebrating spiritual, intellectual, and physical enrichment through
            meticulously crafted, eco- friendly grooming products, serving
            Modern Masculinity.
          </h4>
        </div>
        <div className=" flex justify-between items-center ">
          <button className="py-1 px-2 border">Learn more</button>
          <h1 className="text-5xl font-medium tracking-wider">Barberian</h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
