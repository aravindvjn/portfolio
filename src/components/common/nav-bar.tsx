import React from "react";
import { navLinks } from "./nav-links";
import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const NavBar = () => {
  return (
    <div className="fixed z-10 w-full flex items-center px-[10px] right-0 bg-black/70 backdrop-blur h-[40px]">
      <nav className=" flex absolute right-0 sm:right-[20px] items-center md:right-[50px] max-w-[500px] text-[12px] gap-[10px] justify-around sm:gap-[30px]">

        {navLinks.map((nav) => (
          <Link className="cursor-pointer" key={nav.link} href={nav.link}>
            {nav.label}
          </Link>
        ))}

        <div className="flex items-center gap-[5px] sm:gap-[12px]">
          <Link className="cursor-pointer" href={"/"}>
            <FaGithub size={14} />
          </Link>
          <Link className="cursor-pointer" href={"/"}>
            <FaLinkedinIn size={15} className="text-white" />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
