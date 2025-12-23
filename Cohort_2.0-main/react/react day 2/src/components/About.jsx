import React from "react";
import cardImage from "../assets/coat-DkwKoeKB.png";

const About = () => {
  return (
    <div className="flex px-3 py-10 gap-4 justify-center items-center">
      <div className="relative py-15 px-10 text-white bg-[#1E1E1E] w-[94%] h-[70vh] rounded-2xl ">
        <div className="text-4xl">ABOUT</div>
        <div className="absolute bottom-0 ">
          <h1 className="text-7xl pb-10">WHERE FASHION MEETS FREEDOM</h1>
          <div className="flex items-center justify-between pb-10 gap-3.5 ">
            <div className="text-lg px-5 opacity-50">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate iure, illo officiis consequuntur fuga magnam accusantium expedita adipisci voluptatibus ipsa amet reiciendis dolores aliquid inventore at est delectus quibusdam quo.
            </div>
            <div className="text-lg pr-15 opacity-50">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate iure, illo officiis consequuntur fuga magnam accusantium expedita adipisci voluptatibus ipsa amet reiciendis dolores aliquid inventore at est delectus quibusdam quo.    
            </div>
          </div>
        </div>
      </div>
      <div className=" w-[94%] h-[70vh] rounded-2xl overflow-hidden">
        <img className="w-full h-full object-cover " src={cardImage} alt="" />
      </div>
    </div>
  );
};

export default About;
