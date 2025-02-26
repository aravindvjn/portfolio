import Image from "next/image";
import React from "react";
import { CardBody } from "../ui/3d-card";

const SingleStack = ({ url }: { url: string }) => {
  return (
    <CardBody className="bg-[#251C31] cursor-pointer rounded-full w-[42px] h-[42px] sm:h-[60px] sm:w-[60px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] overflow-hidden p-[10px] sm:p-[15px] md:p-[30px] flex justify-center items-center">
      <Image
        src={url}
        alt="Stack Icon"
        height={160}
        width={160}
        className="rounded overflow-hidden"
      />
    </CardBody>
  );
};

export default SingleStack;
