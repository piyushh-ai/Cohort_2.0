import React from "react";

const Navbar = () => {
  return (
    <div className=" flex text-white items-center p-7 justify-between w-full h-18 bg-[#060503] ">
      <div className="logo text-3xl font-medium">DVSY</div>
      <div className="navlinks flex gap-2">
        <button className="px-3  rounded-sm py-2 bg-[#313131]">DESIGNERS</button>
        <button className="px-3  rounded-sm py-2 bg-[#313131]">COLLABS</button>
        <button className="px-3  rounded-sm py-2 bg-[#313131]">EVENTS</button>
        <button className="px-3  rounded-sm py-2 bg-[#313131]">BLOG</button>
        <button className="px-3  rounded-sm py-2 bg-[#313131]">CARD</button>
        <button className="px-3  rounded-sm py-2 text-black bg-[#EC6D56]">GET IN TOUCH</button>
      </div>
    </div>
  );
};

export default Navbar;
