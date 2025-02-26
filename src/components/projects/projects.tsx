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
        <p className="opacity-60 text-[14px] md:text-[16px]">
          A Snapshot of My Projects
        </p>
      </div>

      <Suspense fallback={<LoadingProjects />}>
        <ProjectGrid />
      </Suspense>
    </div>
  );
};

export default Projects;
