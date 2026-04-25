"use client";
import { ProjectType } from "./type";
import { SingleProject } from "./single-project";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SplitProjects = ({ projects }: { projects: ProjectType[] }) => {
  const pathname = usePathname();

  const hideShowMore = pathname?.includes("/works");
  return (
    <div>
      {projects?.map((project, index) => {
        return <SingleProject key={project.id} index={index} {...project} />;
      })}
      <div className="flex pb-[50px]">
        {!hideShowMore && (
          <Link href={"/works"} className="mx-auto">
            <button className="mx-auto bg-white/10 outline outline-white/40 px-[15px] py-[7px] rounded w-fit text-[12px] hover:bg-white/40">
              Show More
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SplitProjects;
