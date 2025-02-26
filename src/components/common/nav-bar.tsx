import React from "react";
import { navLinks } from "./nav-links";
import Link from "next/link";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

const NavBar = () => {
  const linkClasses = "cursor-pointer hover:text-orange-500";

  return (
    <div className="fixed z-10 w-full flex items-center px-[10px] right-0 bg-black/70 backdrop-blur h-[40px]">
      <nav className=" flex absolute right-0 sm:right-[20px] items-center md:right-[50px] w-full sm:max-w-[500px] text-[12px] gap-[10px] justify-around sm:gap-[30px]">
        {navLinks.map((nav) => (
          <Link className={linkClasses} key={nav.link} href={nav.link}>
            {nav.label}
          </Link>
        ))}

        <div className="hidden sm:flex items-center sm:gap-[15px]">
          <Link className={linkClasses} target="_blank" href={"https://github.com/aravindvjn"}>
            <FaGithub size={14} />
          </Link>
          <Link className={linkClasses} target="_blank" href={"https://www.linkedin.com/in/aravind-vijayan-nandanam/"}>
            <FaLinkedinIn size={15} />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
