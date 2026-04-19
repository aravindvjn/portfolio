import React from "react";
import { checkIsAdmin } from "@/actions/auth.action";
import { redirect } from "next/navigation";
import HeroWordsTable from "@/components/admin-hero-words/HeroWordsTable";

const page = async () => {
  const isAdmin = await checkIsAdmin();

  if (!isAdmin) {
    redirect("/v1/login");
  }

  return (
    <div>
      <HeroWordsTable />
    </div>
  );
};

export default page;
