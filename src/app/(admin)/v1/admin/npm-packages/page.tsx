import { checkIsAdmin } from "@/actions/auth.action";
import NpmPackagesTable from "@/components/admin-npm-packages/NpmPackagesTable";
import { redirect } from "next/navigation";

const page = async () => {
  const isAdmin = await checkIsAdmin();

  if (!isAdmin) {
    redirect("/v1/login");
  }

  return (
    <div>
      <NpmPackagesTable />
    </div>
  );
};

export default page;
