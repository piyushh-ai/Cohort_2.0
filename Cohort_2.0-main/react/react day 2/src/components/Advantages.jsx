import React from "react";
import bagImg from "../assets/shadow-DsICo5Us.png";
import dummyImg from "../assets/dummy-yZ9e2IZ8.png";

import { RiArrowRightUpLine } from "react-icons/ri";

const Advantages = () => {
  return (
    <div>
      <h1 className="text-white text-5xl pl-10 px-2">OUR ADVANTAGES</h1>
      <div className="flex py-10 h-[70vh] w-full px-3 gap-3">
        <div className="w-[95%] h-full rounded-2xl  overflow-hidden">
          <img className="w-full h-full object-cover" src={bagImg} alt="" />
        </div>
        <div className="w-[95%] h-full ">
          <div className="text-white h-[48%] bg-[#1E1E1E] py-10 px-15  rounded-2xl">
            <div>
              <h1 className="text-3xl uppercase">independent designner</h1>
            </div>
            <div className="flex justify-between items-center pt-20 opacity-65">
              <div className="text-xl w-[80%]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
                nobis ipsum unde voluptatibus et sequi praesentium alias,
                delectus animi similique?
              </div>
              <div className="text-white flex justify-center items-center border text-3xl h-13 w-13 bg-[#3D3F3A] font-extralight rounded-[50%] opacity-65">
                <RiArrowRightUpLine />
              </div>
              <h1 className="text-[25px] opacity-65 ">Explore</h1>
            </div>
          </div>
          <div className="text-white h-[48%] mt-[2.5%] bg-[#1E1E1E] py-10 px-15  rounded-2xl">
            <div>
              <h1 className="text-3xl uppercase">exclusive & uniquity</h1>
            </div>
            <div className="flex justify-between items-center pt-20 opacity-65">
              <div className="text-xl w-[80%]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
                nobis ipsum unde voluptatibus et sequi praesentium alias,
                delectus animi similique?
              </div>
              <div className="text-white flex justify-center items-center border text-3xl h-13 w-13 bg-[#3D3F3A] font-extralight rounded-[50%]">
                <RiArrowRightUpLine />
              </div>
              <h1 className="text-[25px] ">Explore</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="flex  h-[60vh] pb-4 w-full px-3 gap-3">
        <div className="w-[95%] h-full ">
          <div className="text-white h-[48%] bg-[#1E1E1E] py-10 px-15  rounded-2xl">
            <div>
              <h1 className="text-3xl uppercase">high quality</h1>
            </div>
            <div className="flex justify-between items-center pt-20">
              <div className="text-xl w-[80%] opacity-65">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
                nobis ipsum unde voluptatibus et sequi praesentium alias,
                delectus animi similique?
              </div>
              <div className="text-white flex justify-center items-center border text-3xl h-13 w-13 bg-[#3D3F3A] font-extralight rounded-[50%] opacity-65">
                <RiArrowRightUpLine />
              </div>
              <h1 className="text-[25px] opacity-65">Explore</h1>
            </div>
          </div>
          <div className="text-white h-[48%] mt-[2.5%] bg-[#1E1E1E] py-10 px-15  rounded-2xl">
            <div>
              <h1 className="text-3xl uppercase">eco friendly</h1>
            </div>
            <div className="flex justify-between items-center pt-20">
              <div className="text-xl w-[80%] opacity-65">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
                nobis ipsum unde voluptatibus et sequi praesentium alias,
                delectus animi similique?
              </div>
              <div className="text-white flex justify-center items-center border text-3xl h-13 w-13 bg-[#3D3F3A] font-extralight rounded-[50%] opacity-65">
                <RiArrowRightUpLine />
              </div>
              <h1 className="text-[25px] opacity-65">Explore</h1>
            </div>
          </div>
        </div>
        <div className="w-[95%] h-full rounded-2xl  overflow-hidden">
          <img className="w-full h-full object-cover" src={dummyImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Advantages;
