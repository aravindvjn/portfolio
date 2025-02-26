import React, { Suspense } from "react";
import Heading from "../common/heading";
import ProjectGrid from "./project-grid";
import LoadingProjects from "./loading-projects";

const Projects = () => {
  return (
    <div
      id="projects"
      className="py-[20px] sm:[p-40px] md:p-[60px] lg:p-[90px]"
    >
      <div className="text-center">
        <Heading text="My Projects" />
      </div>

      <Suspense fallback={<LoadingProjects />}>
        <ProjectGrid />
      </Suspense>
    </div>
  );
};

export default Projects;
