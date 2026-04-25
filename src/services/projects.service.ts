import { prisma } from "@/lib/db";

type WorksCategory = "personal" | "professional" | "npm";

export const getAllProjects = async (category?: WorksCategory) => {
  try {
    const where =
      category === "personal"
        ? { category: "PERSONAL" as const }
        : category === "professional"
          ? { category: "PROFESSIONAL" as const }
          : undefined;

    const [
      projects,
      npmPackages,
      personalProjectsCount,
      professionalProjectsCount,
      npmPackagesCount,
    ] = await Promise.all([
      category === "npm"
        ? Promise.resolve([])
        : prisma.projects.findMany({
            where,
            orderBy: [{ priority: "asc" }, { name: "asc" }],
          }),

      category === "npm"
        ? prisma.npmPackage.findMany({
            orderBy: [{ priority: "asc" }, { name: "asc" }],
          })
        : Promise.resolve([]),

      prisma.projects.count({
        where: {
          category: "PERSONAL",
        },
      }),

      prisma.projects.count({
        where: {
          category: "PROFESSIONAL",
        },
      }),

      prisma.npmPackage.count(),
    ]);

    return {
      success: true,
      data: {
        projects,
        npmPackages,
        stats: {
          personalProjects: personalProjectsCount,
          professionalProjects: professionalProjectsCount,
          npmPackages: npmPackagesCount,
        },
      },
      message: "Works fetched successfully",
    };
  } catch (error) {
    console.error("getAllProjects error:", error);

    return {
      success: false,
      data: {
        projects: [],
        npmPackages: [],
        stats: {
          personalProjects: 0,
          professionalProjects: 0,
          npmPackages: 0,
        },
      },
      message: "Failed to fetch works",
    };
  }
};
