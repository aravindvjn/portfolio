"use client";
import React from "react";
import Heading from "../common/heading";
import SingleStack from "./single-stack";
import { stack } from "@/assets/stack";
import { motion } from "framer-motion";
import { CardContainer } from "../ui/3d-card";

const MyStack = () => {
  return (
    <div id="stack" className="p-[20px] sm:[p-40px] md:p-[60px] lg:p-[90px]">
      <div className="text-center">
        <Heading text="My Tech Stack" />
        <p className="opacity-60 text-[14px] md:text-[16px]">
          Technologies I've been using lately
        </p>
      </div>
      <CardContainer>
        <motion.div
          animate={{
            y: [0, -5, 0],
            x: [0, 5, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex justify-center flex-wrap gap-[15px] sm:gap-[20px] md:gap-[30px] p-[20px] sm:p-[30px] md:p-[50px] max-w-[1100px] mx-auto"
        >
          {stack.map((item, index) => (
            <SingleStack key={index} url={item.src} />
          ))}
        </motion.div>
      </CardContainer>
    </div>
  );
};

export default MyStack;
