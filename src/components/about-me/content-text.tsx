import React from "react";
import Content from "../common/content";
import { getMyAge } from "@/lib/helpers/get-age";

const ContentTexts = () => {
  return (
    <Content>
      I am a passionate {getMyAge()} year old <span>Software Engineer</span>{" "}
      skilled in Modern Web Development. With a strong foundation in both
      front-end and back-end technologies, I build responsive, user-friendly web
      applications from concept to deployment. While my expertise is in web
      development, I also have experience with 
      <span>React Native for cross-platform mobile development</span>. As a 
      <span>Cybersecurity Enthusiast,</span> I am also exploring security
      practices to enhance application safety. Additionally, I have knowledge in{" "}
      <span>Data Engineering</span> and Big Data technologies, enabling me to
      work with large-scale data pipelines and infrastructure.
      development. My focus is on
      creating seamless and efficient digital experiences while continually
      pushing the boundaries of innovation and best practices in web
      development.
    </Content>
  );
};

export default ContentTexts;
