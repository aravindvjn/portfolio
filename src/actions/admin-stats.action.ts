"use server";

import { prisma } from "@/lib/db";
import type { ActionResponse } from "@/types/admin.type";

type AdminExtendedStats = {
  totalProjects: number;
  totalHeroWords: number;
  totalContactOptions: number;
  activeContactOptions: number;
  inactiveContactOptions: number;
  latestHeroWord: {
    id: string;
    text: string;
    createdAt: Date;
  } | null;
  latestContactOption: {
    id: string;
    label: string;
    createdAt: Date;
  } | null;
  topPriorityProject: {
    id: string;
    name: string;
    priority: number | null;
  } | null;
};

export async function getAdminStatsAction(): Promise<
  ActionResponse<AdminExtendedStats>
> {
  try {
    const [
      totalProjects,
      totalHeroWords,
      totalContactOptions,
      activeContactOptions,
      latestHeroWord,
      latestContactOption,
      topPriorityProject,
    ] = await Promise.all([
      prisma.projects.count(),
      prisma.heroWord.count(),
      prisma.contactOption.count(),
      prisma.contactOption.count({
        where: { isActive: true },
      }),
      prisma.heroWord.findFirst({
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          text: true,
          createdAt: true,
        },
      }),
      prisma.contactOption.findFirst({
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          label: true,
          createdAt: true,
        },
      }),
      prisma.projects.findFirst({
        orderBy: {
          priority: "asc",
        },
        select: {
          id: true,
          name: true,
          priority: true,
        },
      }),
    ]);

    return {
      success: true,
      message: "Admin stats fetched successfully.",
      data: {
        totalProjects,
        totalHeroWords,
        totalContactOptions,
        activeContactOptions,
        inactiveContactOptions:
          totalContactOptions - activeContactOptions,
        latestHeroWord,
        latestContactOption,
        topPriorityProject,
      },
    };
  } catch (error) {
    console.error("getAdminStatsAction error:", error);
    return {
      success: false,
      message: "Failed to fetch admin stats.",
    };
  }
}