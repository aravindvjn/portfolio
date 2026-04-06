import { prisma } from "@/lib/db";

export const getPortfolioData = async () => {
  try {
    const [projects, heroWords, contactOptions] = await Promise.all([
      prisma.projects.findMany({
        orderBy: [{ priority: "asc" }, { name: "asc" }],
      }),
      prisma.heroWord.findMany({
        orderBy: [{ priority: "asc" }, { createdAt: "asc" }],
      }),

      prisma.contactOption.findMany({
        where: { isActive: true },
        orderBy: [{ priority: "asc" }, { createdAt: "asc" }],
      }),
    ]);

    return {
      success: true,
      data: {
        projects,
        heroWords,
        contactOptions,
      },
      message: "Portfolio data fetched successfully",
    };
  } catch (error) {
    console.error("getPortfolioData error:", error);
    return {
      success: false,
      data: {
        projects: [],
        heroWords: [],
        contactOptions: [],
      },
      message: "Failed to fetch portfolio data",
    };
  }
};
