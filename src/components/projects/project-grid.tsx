import React from "react";
import { prisma } from "@/lib/db";
import SplitProjects from "./split-projects";
import { ProjectType } from "./type";

const ProjectGrid = async ({ projects }: { projects: ProjectType[] }) => {
  if (projects.length === 0) {
    return (
      <div className="h-dvh p-[20px] pt-[60px] sm:p-[40px] md:p-[60px] lg:p-[90px] flex justify-center items-center p-[20px]">
        <div className="text-center text-red-500">
          <p className="text-[25px] font-semibold">Error!</p>
          <p className="">Something Went Wrong!</p>
          <p>Failed to fetch Projects, Please retry again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="sm:px-[40px] md:px-[60px] lg:px-[90px] flex justify-center items-center px-[20px]">
      <SplitProjects projects={projects} />
    </div>
  );
};

export default ProjectGrid;
