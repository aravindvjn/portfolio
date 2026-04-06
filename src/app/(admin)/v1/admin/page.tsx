import { checkIsAdmin } from "@/actions/auth.action";
import AdminStatsCards from "@/components/admin/AdminStatsCards";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const isAdmin = await checkIsAdmin();

  if (!isAdmin) {
    redirect("/v1/login");
  }

  return (
    <div>
      <AdminStatsCards />
    </div>
  );
};

export default page;
