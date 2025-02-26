"use client";
import React, { useState } from "react";
import { ProjectType } from "./type";
import { SingleProject } from "./single-project";

const SplitProjects = ({ projects }: { projects: ProjectType[] }) => {
  const [showMore, setShowMore] = useState<number>(3);

  const handleShowMore = () => {
    setShowMore((prev) => prev + 5);
  };

  return (
    <div>
      {projects?.map((project, index) => {
        if (index > showMore) {
          return;
        }
        return <SingleProject key={project.id} index={index} {...project} />;
      })}
      <div className="flex pb-[50px]">
        {projects.length > showMore && (
          <button
            onClick={handleShowMore}
            className="mx-auto bg-white/10 outline outline-white/40 px-[15px] py-[7px] rounded w-fit text-[12px] hover:bg-white/40"
          >
            Show More
          </button>
        )}
      </div>
    </div>
  );
};

export default SplitProjects;
