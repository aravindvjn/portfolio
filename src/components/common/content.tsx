import React from "react";

const Content = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-white/70 tracking-wider text-justify content text-[13px] sm:text-[14px] md:text-[15px] lg:text-[16px]">{children}</p>;
};

export default Content;
