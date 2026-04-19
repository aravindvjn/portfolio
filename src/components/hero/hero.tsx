"use client";

import React, { useEffect, useRef } from "react";
import heroBackground from "@/assets/bg/bg.png";
import heroLayout from "@/assets/bg/bg-layout.png";
import Buttons from "./buttons";
import NavBar from "../common/nav-bar";
import TypingEffect from "../common/typing-effect";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ContentTexts from "../about-me/content-text";
import Photo from "../about-me/photo";

const WORDS = ["Software Engineer", "Cybersecurity Enthusiast", "DevOps"];

type Props = {
  words: string[];
};

const Hero = ({ words }: Props) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const layoutRef = useRef<HTMLDivElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const photoRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(bgRef.current, {
        scale: 1,
      });

      gsap.set(layoutRef.current, {
        scale: 1,
        opacity: 1,
      });

      gsap.set(overlayRef.current, {
        backgroundColor: "rgba(6,17,35,0)",
      });

      gsap.set(aboutRef.current, {
        opacity: 0,
      });

      gsap.set(photoRef.current, {
        opacity: 0,
        y: 80,
        scale: 0.9,
      });

      gsap.set(textRef.current, {
        opacity: 0,
        y: 80,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=2200",
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(
        layoutRef.current,
        {
          scale: 2,
          ease: "none",
        },
        0,
      )
        .to(
          introRef.current,
          {
            opacity: 0,
            y: -60,
            ease: "none",
          },
          0,
        )
        .to(
          aboutRef.current,
          {
            opacity: 1,
            ease: "none",
          },
          0.22,
        )
        .to(
          photoRef.current,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power2.out",
          },
          0.28,
        )
        .to(
          textRef.current,
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
          },
          0.34,
        )
        .to(
          overlayRef.current,
          {
            backgroundColor: "rgba(6,17,35,1)",
            ease: "none",
          },
          0.48,
        )
        .to(
          bgRef.current,
          {
            scale: 1.2,
            ease: "none",
          },
          0,
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-dvh w-full overflow-hidden">
      <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/30" />

      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        <Image
          src={heroBackground}
          alt="Hero background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      <div
        ref={layoutRef}
        className="absolute inset-0 z-[1] will-change-transform"
      >
        <Image
          src={heroLayout}
          alt="Hero layout"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      <div
        ref={overlayRef}
        className="absolute inset-0 z-[2]"
        style={{ backgroundColor: "rgba(6,17,35,0)" }}
      />

      <div className="relative z-[3] flex h-full flex-col">
        <NavBar />

        <div className="relative flex-1">
          <div
            ref={introRef}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="flex h-full w-full p-[20px] font-bold text-white/90 sm:p-[40px] md:p-[60px] lg:p-[90px]">
              <div className="self-end">
                <p className="text-[20px] leading-[1.1] sm:text-[30px] md:text-[40px] lg:text-[50px]">
                  Hai,
                </p>
                <p className="text-[27px] leading-[1] sm:text-[40px] md:text-[60px] lg:text-[70px]">
                  I&#39;m Aravind Vijayan
                </p>
                <p className="text-[18px] leading-[1.4] sm:text-[25px] md:text-[30px] lg:text-[35px]">
                  <TypingEffect words={words?.length ? words : WORDS} />
                </p>
                <Buttons />
              </div>
            </div>
          </div>

          <div
            ref={aboutRef}
            className="absolute opacity-0 inset-0 flex items-center px-[20px] sm:px-[40px] md:px-[60px] lg:px-[90px]"
          >
            <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 md:flex-row md:items-center md:justify-between lg:gap-16">
              <div
                ref={photoRef}
                className="flex w-full justify-center md:w-auto md:justify-start"
              >
                <Photo />
              </div>

              <div
                ref={textRef}
                className="w-full max-w-3xl text-center text-white md:text-left"
              >
                <p className="mb-4 text-[26px] font-bold leading-[1.05] sm:text-[34px] md:text-[42px] lg:text-[54px]">
                  About Me
                </p>

                <div className="text-[15px] leading-[1.8] text-white/80 sm:text-[17px] md:text-[18px] lg:text-[20px]">
                  <ContentTexts />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;