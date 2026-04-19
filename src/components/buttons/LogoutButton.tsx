"use client";

import React, { useState } from "react";
import { LogOut } from "lucide-react";
import { createPortal } from "react-dom";
import { useAdminLogout } from "@/hooks/mutations/use-admin";

const LogoutButton = () => {
  const [open, setOpen] = useState(false);

  const { mutate, isPending } = useAdminLogout();

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-white/75 transition hover:bg-white/[0.08]"
      >
        <LogOut className="h-4 w-4" />
        Logout
      </button>

      {open &&
        createPortal(
          <div className="fixed inset-0 w-screen h-screen z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            <div className="relative z-10 w-[90%] max-w-sm rounded-2xl border border-white/10 bg-[#111] p-6 shadow-xl">
              <h2 className="text-base font-semibold text-white">
                Confirm Logout
              </h2>

              <p className="mt-2 text-sm text-white/60">
                Are you sure you want to logout?
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-4 py-2 text-sm text-white/60 hover:bg-white/10"
                >
                  Cancel
                </button>

                <button
                  disabled={isPending}
                  onClick={() => mutate()}
                  className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600"
                >
                  {isPending ? "Logging out..." : "Logout"}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};

export default LogoutButton;
