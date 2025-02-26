import React from "react";

const Heading = ({ text }: { text: string }) => {
  return <p className="text-[20px] sm:text-[25px] md:text-[30px] lg:text-[35px] font-bold opacity-75 order-1">{text}</p>;
};

export default Heading;
