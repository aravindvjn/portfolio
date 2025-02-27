"use client";

import Image from "next/image";
import React, { useState } from "react";
import { CardContainer } from "../ui/3d-card";
import Link from "next/link";
import { motion } from "framer-motion";
import { ProjectType } from "./type";
import ShowPreview from "./show-preview";

export function SingleProject(
  project: ProjectType & {
    index: number;
  }
) {
  const { content, githubLink, name, index, image_url } = project;
  const placeholder = "/placeholder.jpg";

  const [showPreview, setShowPreview] = useState<boolean>(false);

  const handleClick = () => {
    setShowPreview(true);
  };

  const imageComponent = (
    <CardContainer className="w-full h-full ">
      <Image
        onClick={handleClick}
        src={image_url || placeholder}
        height="1000"
        width="1000"
        className="h-full cursor-pointer w-full outline outline-white/30 outline-[1px] object-cover rounded sm:rounded-xl group-hover/card:shadow-xl "
        alt="thumbnail"
      />
    </CardContainer>
  );

  const contentComponent = (
    <div className="w-full mt-[10px] sm:mt-0 flex self-start flex-col h-full ">
      <p className="text-[12px] sm:text-[14px] opacity-60 text-justify">
        {content}
      </p>

      <motion.div
        whileHover={{
          scale: 1.01,
          rotateZ: "-2deg",
        }}
        className="mt-[10px] sm:mt-[20px]"
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
      
      <ShowPreview
        {...project}
        setShowPreview={setShowPreview}
        showPreview={showPreview}
      />

      <div
        className={`hidden md:grid grid-cols-2 md:gap-[30px] lg:gap-[70px] p-5 ${
          index === 0 ? "mb-[150px] mt-[50px]" : "my-[150px]"
        }`}
      >
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
