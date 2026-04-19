import ProjectsTable from "@/components/admin-projects/ProjectsTable";
import { checkIsAdmin } from "@/actions/auth.action";
import { redirect } from "next/navigation";

const page = async () => {
  const isAdmin = await checkIsAdmin();

  if (!isAdmin) {
    redirect("/v1/login");
  }

  return (
    <div>
      <ProjectsTable />
    </div>
  );
};

export default page;
