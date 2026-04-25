import Link from "next/link";
import { ExternalLink, Package } from "lucide-react";
import Heading from "../common/heading";
import ProjectGrid from "./project-grid";
import { ProjectType } from "./type";
import { cn } from "@/lib/utils";
import { BsGithub } from "react-icons/bs";
import NpmPackageCard from "./NpmPackageCard";

type Stats = {
  personalProjects: number;
  professionalProjects: number;
  npmPackages: number;
};

type WorksCategory = "personal" | "professional" | "npm";

export type NpmPackageType = {
  id: string;
  name: string;
  packageName: string;
  description: string;
  npmUrl?: string | null;
  githubUrl?: string | null;
  demoUrl?: string | null;
  image_url?: string | null;
  version?: string | null;
  tags: string[];
  isFeatured: boolean;
  priority?: number | null;
};

const Projects = ({
  projects,
  npmPackages = [],
  stats,
  activeCategory,
  showAllLink = false,
}: {
  projects: ProjectType[];
  npmPackages?: NpmPackageType[];
  stats: Stats;
  activeCategory?: WorksCategory;
  showAllLink?: boolean;
}) => {
  const statItems = [
    ...(showAllLink
      ? [
          {
            label: "All Works",
            value:
              stats.personalProjects +
              stats.professionalProjects +
              stats.npmPackages,
            href: "/works",
            category: undefined,
          },
        ]
      : []),
    {
      label: "Professional Projects",
      value: stats.professionalProjects,
      href: "/works?category=professional",
      category: "professional",
    },
    {
      label: "Personal Projects",
      value: stats.personalProjects,
      href: "/works?category=personal",
      category: "personal",
    },
    {
      label: "NPM Packages",
      value: stats.npmPackages,
      href: "/works?category=npm",
      category: "npm",
    },
  ].filter((item) => item.value > 0);

  const showProjects = activeCategory !== "npm";
  const showPackages =
    activeCategory === "npm" || (!activeCategory && npmPackages.length > 0);

  return (
    <section id="works" className="w-full">
      <div className="flex flex-col items-center px-6 pt-20 pb-10 text-center md:px-12 lg:pt-32">
        <Heading text="My Works" />

        <p className="order-2 mt-2 text-sm opacity-60 md:text-base">
          A Snapshot of My Works
        </p>

        <div
          className={cn(
            "order-3 mt-8 grid w-full grid-cols-1 gap-3 md:grid-cols-3",
            statItems.length === 1
              ? "mx-auto max-w-sm md:grid-cols-1"
              : statItems.length === 2
                ? "mx-auto max-w-xl md:grid-cols-2"
                : "max-w-4xl",
          )}
        >
          {statItems.map((item) => {
            const isActive = item.category === activeCategory;
            const isAllActive = !activeCategory && item.label === "All Works";

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "group rounded-2xl border px-5 py-4 text-left backdrop-blur transition hover:-translate-y-1",
                  isActive || isAllActive
                    ? "border-blue-400/50 bg-blue-500/15"
                    : "border-white/10 bg-white/[0.04] hover:border-white/25 hover:bg-white/[0.08]",
                )}
              >
                <p className="text-3xl font-semibold tracking-tight tabular-nums">
                  {item.value}+
                </p>

                <p
                  className={cn(
                    "mt-1 text-xs font-medium uppercase tracking-[0.18em] transition",
                    isActive || isAllActive
                      ? "text-blue-300"
                      : "text-white/50 group-hover:text-white/80",
                  )}
                >
                  {item.label}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      {showProjects && projects.length > 0 && (
        <ProjectGrid projects={projects} />
      )}

      {showPackages && npmPackages.length > 0 && (
        <div className="mx-auto grid w-full max-w-6xl gap-5 px-6 pb-24 md:grid-cols-2 lg:px-10">
          {npmPackages.map((item) => (
            <NpmPackageCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {projects.length === 0 && npmPackages.length === 0 && (
        <div className="px-6 pb-24 text-center text-sm text-white/50">
          No works found.
        </div>
      )}
    </section>
  );
};

export default Projects;
