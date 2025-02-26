"use client";

import Image from "next/image";
import React from "react";
import { CardContainer } from "../ui/3d-card";
import placeholder from "@/assets/placeholder.jpg";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProjectType } from "./type";

export function SingleProject({
  content,
  githubLink,
  name,
  index,
  image_url,
}: ProjectType & {
  index: number;
}) {
  const imageComponent = (
    <CardContainer className="w-full">
      <Image
        src={image_url || placeholder.src}
        height="1000"
        width="1000"
        className="h-full w-full outline outline-white/30 outline-[1px] object-cover rounded sm:rounded-xl group-hover/card:shadow-xl "
        alt="thumbnail"
      />
    </CardContainer>
  );

  const contentComponent = (
    <div className="w-full flex-1 mt-4 flex self-start flex-col">
      <p className="text-[12px] sm:text-[14px] opacity-60 text-justify">
        {content}
      </p>
      <motion.div
        whileHover={{
          scale: 1.01,
          rotateZ: "-2deg",
        }}
        className="mt-[10px]"
      >
        <Link
          target="_blank"
          href={githubLink}
          className="bg-blue-500 text-[12px] md:text-[16px] px-[15px]  py-[7px] rounded w-fit"
        >
          Source code
        </Link>
      </motion.div>
    </div>
  );

  const heading = (
    <p className="font-semibold text-[18px] md:text-[22px] py-[5px] sm:py-[10px]">
      {name}
    </p>
  );

  if (isNaN(index)) return;

  return (
    <div>
      <div className={`hidden md:grid grid-cols-2 md:gap-[30px] lg:gap-[70px] ${index===0 ? "mb-[150px] mt-[50px]" : "my-[150px]"}`}>
        {index % 2 === 0 && imageComponent}
        <div>
          {heading}
          {contentComponent}
        </div>
        {index % 2 === 1 && imageComponent}
      </div>
      <div className="flex flex-col md:hidden mb-[50px] mt-[15px] grid-cols-2 gap-[0px]  mx-[20px] ">
        {heading}
        {imageComponent}
        {contentComponent}
      </div>
    </div>
  );
}
