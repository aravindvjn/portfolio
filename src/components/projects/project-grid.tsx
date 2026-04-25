import SplitProjects from "./split-projects";
import { ProjectType } from "./type";

const ProjectGrid = async ({ projects }: { projects: ProjectType[] }) => {
  return (
    <div className="sm:px-[40px] md:px-[60px] lg:px-[90px] flex justify-center items-center px-[20px]">
      <SplitProjects projects={projects} />
    </div>
  );
};

export default ProjectGrid;
