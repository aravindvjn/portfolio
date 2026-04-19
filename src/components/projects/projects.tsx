import React, { Suspense } from "react";
import Heading from "../common/heading";
import ProjectGrid from "./project-grid";
import { ProjectType } from "./type";

const Projects = ({ projects }: { projects: ProjectType[] }) => {
  return (
    <section id="projects" className="w-full">
      <div className="flex flex-col items-center px-6 pt-20 pb-10 text-center md:px-12 lg:pt-32">
        <Heading text="My Projects" />
        <p className="mt-2 text-sm opacity-60 md:text-base">
          A Snapshot of My Projects
        </p>
      </div>
      <ProjectGrid projects={projects} />
    </section>
  );
};

export default Projects;
