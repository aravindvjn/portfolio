"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Sparkles,
  PhoneCall,
  Menu,
  X,
  LogOut,
  ChevronRight,
  Package,
} from "lucide-react";
import LogoutButton from "../buttons/LogoutButton";

type NavItem = {
  label: string;
  href: string;
  icon: React.ElementType;
};

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/v1/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Projects",
    href: "/v1/admin/projects",
    icon: FolderKanban,
  },
  {
    label: "NPM Packages",
    href: "/v1/admin/npm-packages",
    icon: Package,
  },
  {
    label: "Hero Words",
    href: "/v1/admin/hero-words",
    icon: Sparkles,
  },
  {
    label: "Contact Options",
    href: "/v1/admin/contact-options",
    icon: PhoneCall,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [open]);

  return (
    <>
      <div className="border-b border-white/10 bg-black/20 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-lg font-semibold text-white">Admin Panel</p>
            <p className="text-xs text-white/50">Manage portfolio content</p>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white/80 transition hover:bg-white/[0.08]"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <aside className="hidden h-screen w-72 shrink-0 border-r border-white/10 bg-black/20 backdrop-blur-md lg:sticky lg:top-0 lg:flex lg:flex-col">
        <SidebarContent pathname={pathname} />
      </aside>

      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/60 transition-opacity duration-200 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        <div
          className={`absolute left-0 top-0 h-full w-[85%] max-w-72 border-r border-white/10 bg-[#0b0b0c]/95 backdrop-blur-xl transition-transform duration-300 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
            <div>
              <p className="text-lg font-semibold text-white">Admin Panel</p>
              <p className="text-xs text-white/50">Manage portfolio content</p>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-white/80 transition hover:bg-white/[0.08]"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <SidebarNav pathname={pathname} />
        </div>
      </div>
    </>
  );
}

function SidebarContent({ pathname }: { pathname: string }) {
  return (
    <>
      <div className="border-b border-white/10 px-5 py-5">
        <p className="text-xl font-semibold text-white">Admin Panel</p>
        <p className="mt-1 text-sm text-white/50">Manage portfolio content</p>
      </div>

      <SidebarNav pathname={pathname} />

      <div className="mt-auto border-t border-white/10 p-4">
        <LogoutButton />
      </div>
    </>
  );
}

function SidebarNav({ pathname }: { pathname: string }) {
  return (
    <nav className="flex-1 space-y-2 p-4">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          pathname === item.href ||
          (item.href !== "/v1/admin" && pathname.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`group flex items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-200 ${
              isActive
                ? "border-white/20 bg-white/[0.10] text-white shadow-[0_10px_30px_rgba(0,0,0,0.14)]"
                : "border-transparent bg-transparent text-white/65 hover:border-white/10 hover:bg-white/[0.05] hover:text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`rounded-xl p-2 transition ${
                  isActive
                    ? "bg-white/[0.10] text-white"
                    : "bg-white/[0.04] text-white/70 group-hover:bg-white/[0.08]"
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>

              <span className="text-sm font-medium">{item.label}</span>
            </div>

            <ChevronRight
              className={`h-4 w-4 transition ${
                isActive
                  ? "translate-x-0 text-white/80"
                  : "text-white/25 group-hover:translate-x-0.5 group-hover:text-white/50"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
}
