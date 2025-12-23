import React from "react";
import { RiArrowDownLine } from "react-icons/ri";
const Hero = () => {
  let heroImage = "https://dvsy-ui.netlify.app/assets/hero-uf3nLNuc.png";
  return (
    <div className="h-[92vh]  w-full px-3  overflow-hidden ">
      <div
        className="h-screen relative w-full bg-center bg-cover rounded-2xl"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <h1 className="text-white absolute top-[37%] font-light left-50 text-9xl">
          DESIGN
        </h1>

        <div className="w-[80vw]  text-white absolute top-[50%] left-80 ">
          <h1 className="text-9xl font-light">& FREEDOM</h1>
          <div className="w-full flex justify-between pr-3 mt-20">
            <h3 className="capitalize opacity-[0.7] text-2xl trackinFg-[0.15rem]">
              explore independent style by embracing uniqueness <br /> with our
              exclusive apparel
            </h3>
            <div className="flex gap-5 mr-20 justify-cente items-center">
              <div className="text-white flex justify-center items-center border text-3xl h-15 w-15 bg-[#3D3F3A] font-extralight rounded-[50%]">
                <RiArrowDownLine />
              </div>
              <h1 className="text-[20px]">LEARN MORE</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
