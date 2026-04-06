"use client";

import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      <div className="lg:flex">
        <AdminSidebar />

        <main className="min-h-screen flex-1">
          <div className="mx-auto w-full max-w-7xl p-4 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}