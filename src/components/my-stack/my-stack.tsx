"use client";
import React, { useRef } from "react";
import Heading from "../common/heading";
import SingleStack from "./single-stack";
import { stack } from "@/assets/stack";
import { CardContainer } from "../ui/3d-card";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const MyStack = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray(".stack-item");

      gsap.set(items, {
        opacity: 0,
        y: 60,
        scale: 0.9,
      });

      gsap.to(items, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 20%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <div
      id="stack"
      ref={sectionRef}
      className="p-[20px] sm:p-[40px] md:p-[60px] lg:p-[90px]"
    >
      <div className="text-center">
        <Heading text="My Tech Stack" />
        <p className="opacity-60 text-[14px] md:text-[16px]">
          Technologies I&#39;ve been using lately
        </p>
      </div>

      <CardContainer>
        <div className="flex justify-center flex-wrap gap-[15px] sm:gap-[20px] md:gap-[30px] p-[20px] sm:p-[30px] md:p-[50px] max-w-[1100px] mx-auto">
          {stack.map((item, index) => (
            <div key={index} className="stack-item">
              <SingleStack url={item.src} />
            </div>
          ))}
        </div>
      </CardContainer>
    </div>
  );
};

export default MyStack;