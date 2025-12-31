import React from "react";
import logo from "../assets/logo.webp";


const Footer = () => {
  return (
    <div style={{fontFamily: "Helvetica"}} className="relative border-black h-[65vh] flex flex-col w-full bg-[#242223]">
      <div className=" top flex justify-end gap-5 pt-3 px-10">
        <div className="flex flex-col px-2  justify-center items-end ">
          <h1 className="text-2xl">Browse</h1>
          <a className="text-lg text-[#a8a0a0] hover:text-[#7E726F] hover:underline" href="">Home page</a>
          <a className="text-lg text-[#a8a0a0] hover:text-[#7E726F] hover:underline" href="">Products</a>
        </div>
        <div className="flex flex-col px-2  justify-center items-end ">
          <h1 className="text-2xl">Learn</h1>
          <a className="text-lg text-[#a8a0a0] hover:text-[#7E726F] hover:underline" href="">About us</a>
          <a className="text-lg text-[#a8a0a0] hover:text-[#7E726F] hover:underline" href="">Blog</a>
        </div>
        <div className="flex flex-col px-2  justify-center items-end ">
          <h1 className="text-2xl">Help</h1>
          <a className="text-lg text-[#a8a0a0] hover:text-[#7E726F] hover:underline" href="">Contact us</a>
          <a className="text-lg text-[#a8a0a0] hover:text-[#7E726F] hover:underline" href="">Support</a>
        </div>
      </div>
      <div className="mid  w-full px-5">
        <h1 className="text-[19vw]">Barberian</h1>
      </div>
      <div className=" px-20 absolute bottom-10 w-full flex justify-between items-center ">
        <h2 className="opacity-40">© Barberian Men’s Grooming. 2025. All rights reserved.</h2>
        <h1 className="opacity-40">Website built by Piyush Sirolia</h1>
        <div className="w-10 "><img className="h-full w-full opacity-40 object-center object-cover" src={logo} alt="" /></div>
      </div>
    </div>
  );
};

export default Footer;
