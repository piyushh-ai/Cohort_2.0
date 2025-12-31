import React from "react";
import logo from "../assets/logo.webp";
import logoBlack from "../assets/logoBlack.webp";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 991);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <nav
        className={`fixed backdrop-blur-lg  z-50 flex border-b border-black items-center justify-between h-15 py-3 px-5 w-full bg-[#ffffff1a] ${
          scrolled ? "text-black py-3" : ""
        }`}
      >
        <div className="pl-5 h-full">
          <img
            className="h-full w-full object-center object-cover"
            src={scrolled ? logoBlack : logo}
            alt=""
          />
        </div>
        <div>
          <a
            className="m-2 font-(family-name:Inter, sans-serif) uppercase font-medium opacity-90 text-sm pr-2 hover:opacity-50 hover:underline"
            href="#"
          >
            products
          </a>
          <a
            className="m-2 font-(family-name:Inter, sans-serif) uppercase font-medium opacity-90 text-sm pr-2 hover:opacity-50 hover:underline"
            href="#"
          >
            barberian man
          </a>
          <a
            className="m-2 font-(family-name:Inter, sans-serif) uppercase font-medium opacity-90 text-sm pr-2 hover:opacity-50 hover:underline"
            href="#"
          >
            distribution
          </a>
          <a
            className="m-2 font-(family-name:Inter, sans-serif) uppercase font-medium opacity-90 text-sm pr-2 hover:opacity-50 hover:underline"
            href="#"
          >
            stockists
          </a>
          <a
            className="m-2 font-(family-name:Inter, sans-serif) uppercase font-medium opacity-90 text-sm pr-2 hover:opacity-50 hover:underline"
            href="#"
          >
            blog
          </a>
          <a
            className="m-2 font-(family-name:Inter, sans-serif) uppercase font-medium opacity-90 text-sm pr-2 hover:opacity-50 hover:underline"
            href="#"
          >
            contct us
          </a>
          <a
            className="m-2 font-(family-name:Inter, sans-serif) uppercase font-medium opacity-90 text-sm py-1 px-2 border"
            href="#"
          >
            stock our product
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
