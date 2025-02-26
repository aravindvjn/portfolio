import Link from "next/link";
import React from "react";

const Buttons = () => {
  const buttonClasses =
    "px-[10px] sm:px-[15px] py-[5px] sm:py-[10px] rounded sm:rounded-lg backdrop-blur-sm";
  return (
    <div className="flex text-[12px] sm:text-[16px] items-center mt-[10px] gap-[10px] md:gap-[20px]">
      <Link
        className={`${buttonClasses} bg-white/20 text-white`}
        href={"/#about"}
      >
        About Me
      </Link>
      <Link
        className={`${buttonClasses} bg-white text-background `}
        href={"/#about"}
      >
        Contact Me
      </Link>
    </div>
  );
};

export default Buttons;
