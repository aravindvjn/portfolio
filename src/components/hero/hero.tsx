import React from "react";
import heroBackground from "@/assets/hero-background.jpg";
import Buttons from "./buttons";
import NavBar from "../common/nav-bar";
import TypingEffect from "../common/typing-effect";

const Hero = () => {
    
  const words = [
    "A Full Stack Developer",
    "React Native Developer",
    "Cybersecurity Enthusiast",
  ];

  return (
    <div
      style={{
        backgroundImage: `url(${heroBackground.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="aspect-square sm:aspect-none sm:h-dvh w-full"
    >
      <NavBar />
      <div className="font-bold bg-black/15 w-full h-full text-white/60 p-[20px] sm:p-[40px] md:p-[60px] lg:p-[90px] flex">
        <div className="self-end">
          <p className="text-[20px] sm:text-[30px] md:text-[40px] lg:text-[50px] leading-[1.1]">
            Hai!
          </p>
          <p className="text-[30px] sm:text-[40px] md:text-60px] lg:text-[70px] leading-[1]">
            I&#39;m Aravind Vijayan
          </p>
          <p className="text-[20px] sm:text-[25px] md:text-[30px] lg:text-[35px] leading-[1.4]">
            <TypingEffect words={words} />
          </p>
          <Buttons />
        </div>
      </div>
    </div>
  );
};

export default Hero;
