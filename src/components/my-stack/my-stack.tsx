"use client";

import React, { useEffect, useRef } from "react";
import Heading from "../common/heading";
import SingleStack from "./single-stack";
import { stack } from "@/assets/stack";
import { CardContainer } from "../ui/3d-card";
import gsap from "gsap";

const MyStack = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const items = sectionRef.current.querySelectorAll(".stack-item");

    gsap.set(items, {
      opacity: 0,
      y: 60,
      scale: 0.9,
    });

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (!entry.isIntersecting || hasAnimatedRef.current) return;

        hasAnimatedRef.current = true;

        gsap.to(items, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          clearProps: "transform,opacity",
        });

        observer.disconnect();
      },
      {
        threshold: 0.25,
        root: null,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="stack"
      ref={sectionRef}
      className="p-[20px] sm:p-[40px] md:p-[60px] lg:p-[90px]"
    >
      <div className="text-center">
        <Heading text="My Tech Stack" />
        <p className="text-[14px] opacity-60 md:text-[16px]">
          Technologies I&#39;ve been using lately
        </p>
      </div>

      <CardContainer>
        <div className="mx-auto flex max-w-[1100px] flex-wrap justify-center gap-[15px] p-[20px] sm:gap-[20px] sm:p-[30px] md:gap-[30px] md:p-[50px]">
          {stack.map((item, index) => (
            <div key={index} className="stack-item">
              <SingleStack url={item.src} />
            </div>
          ))}
        </div>
      </CardContainer>
    </section>
  );
};

export default MyStack;