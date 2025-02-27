import React from "react";

const Footer = () => {
  return (
    <div className="text-center mt-[50px] mb-[10px] font-light text-[12px] md:text-[14px] ">
      <p className="cursor-pointer opacity-50 hover:opacity-100 hover:text-purple-400">
        &copy;{new Date().getFullYear()}. aravindvijayan.vercel.app
      </p>
    </div>
  );
};

export default Footer;
