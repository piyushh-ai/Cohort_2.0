import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center pb-5">
      <Link href={"/"}>Piyush Sirolia</Link>
      <div className="flex gap-4">
        <Link href={"/about"}>about</Link>
        <Link href={"/contact"}>contact</Link>
      </div>
      <div>
        <h1>Login</h1>
      </div>
    </div>
  );
};

export default Navbar;
