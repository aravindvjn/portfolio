import { redirect } from "next/navigation";
import { checkIsAdmin } from "@/actions/auth.action";
import LoginForm from "@/components/admin-auth/LoginForm";

const Page = async () => {
  const isAdmin = await checkIsAdmin();

  if (isAdmin) {
    redirect("/v1/admin");
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <LoginForm />
    </div>
  );
};

export default Page;