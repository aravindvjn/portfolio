import React from "react";
import Photo from "./photo";
import Heading from "../common/heading";
import ContentTexts from "./content-text";

const AboutMe = () => {
  return (
    <div id="about-me" className="p-[20px] sm:p-[40px] md:p-[60px] lg:p-[90px] flex flex-col sm:flex-row gap-[10px] sm:gap-[20px] md:gap-[30px] lg:gap-[40px] sm:items-center min-h-[500px]">
      <div className="sm:hidden">
        <Heading text="About Me" />
      </div>

      <Photo />

      <div className="flex flex-col md:gap-[5px] lg:gap-[20px]">
        <div className="hidden sm:flex">
          <Heading text="About Me" />
        </div>
        <ContentTexts />
      </div>
    </div>
  );
};

export default AboutMe;
