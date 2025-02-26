import React from "react";
import { prisma } from "@/lib/db";
import SplitProjects from "./split-projects";

const ProjectGrid = async () => {
  const projects =
    (await prisma.projects.findMany({
      orderBy: [
        {
          priority: {
            sort: "asc",
            nulls: "last",
          },
        },
      ],
    })) || [];
    
  if (projects.length === 0) {
    return (
      <div className="h-dvh flex justify-center items-center p-[20px]">
        <div className="text-center text-red-500">
          <p className="text-[25px] font-semibold">Error!</p>
          <p className="">Something Went Wrong!</p>
          <p>Failed to fetch Projects, Please retry again.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <SplitProjects projects={projects} />
    </div>
  );
};

export default ProjectGrid;
