"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import type { ActionResponse, GetNpmPackagesResponse } from "@/types/admin.type";

export type NpmPackagePayload = {
  name: string;
  packageName: string;
  description: string;
  npmUrl?: string | null;
  githubUrl?: string | null;
  demoUrl?: string | null;
  image_url?: string | null;
  version?: string | null;
  tags?: string[];
  isFeatured?: boolean;
  priority?: number | null;
};

export type UpdateNpmPackagePayload = Partial<NpmPackagePayload> & {
  id: string;
};

export async function getNpmPackagesAction(): Promise<GetNpmPackagesResponse> {
  try {
    const data = await prisma.npmPackage.findMany({
      orderBy: [{ priority: "asc" }, { name: "asc" }],
    });

    return {
      success: true,
      message: "NPM packages fetched successfully.",
      data,
    };
  } catch (error) {
    console.error("getNpmPackagesAction error:", error);

    return {
      success: false,
      message: "Failed to fetch NPM packages.",
    };
  }
}

export async function getNpmPackageByIdAction(
  id: string,
): Promise<ActionResponse> {
  try {
    if (!id?.trim()) {
      return {
        success: false,
        message: "NPM package id is required.",
      };
    }

    const data = await prisma.npmPackage.findUnique({
      where: { id },
    });

    if (!data) {
      return {
        success: false,
        message: "NPM package not found.",
      };
    }

    return {
      success: true,
      message: "NPM package fetched successfully.",
      data,
    };
  } catch (error) {
    console.error("getNpmPackageByIdAction error:", error);

    return {
      success: false,
      message: "Failed to fetch NPM package.",
    };
  }
}

export async function createNpmPackageAction(
  payload: NpmPackagePayload,
): Promise<ActionResponse> {
  try {
    const name = payload.name?.trim();
    const packageName = payload.packageName?.trim();
    const description = payload.description?.trim();

    if (!name || !packageName || !description) {
      return {
        success: false,
        message: "Name, package name, and description are required.",
      };
    }

    const existing = await prisma.npmPackage.findUnique({
      where: { packageName },
      select: { id: true },
    });

    if (existing) {
      return {
        success: false,
        message: "Package name already exists.",
      };
    }

    const data = await prisma.npmPackage.create({
      data: {
        name,
        packageName,
        description,
        npmUrl: payload.npmUrl?.trim() || null,
        githubUrl: payload.githubUrl?.trim() || null,
        demoUrl: payload.demoUrl?.trim() || null,
        image_url: payload.image_url?.trim() || null,
        version: payload.version?.trim() || null,
        tags: payload.tags ?? [],
        isFeatured: payload.isFeatured ?? false,
        priority:
          typeof payload.priority === "number" ? payload.priority : null,
      },
    });

    revalidatePath("/");
    revalidatePath("/works");
    revalidatePath("/admin");
    revalidatePath("/v1/admin");

    return {
      success: true,
      message: "NPM package created successfully.",
      data,
    };
  } catch (error) {
    console.error("createNpmPackageAction error:", error);

    return {
      success: false,
      message: "Failed to create NPM package.",
    };
  }
}

export async function updateNpmPackageAction(
  payload: UpdateNpmPackagePayload,
): Promise<ActionResponse> {
  try {
    const { id } = payload;

    if (!id?.trim()) {
      return {
        success: false,
        message: "NPM package id is required.",
      };
    }

    const existing = await prisma.npmPackage.findUnique({
      where: { id },
    });

    if (!existing) {
      return {
        success: false,
        message: "NPM package not found.",
      };
    }

    if (payload.packageName !== undefined) {
      const packageName = payload.packageName.trim();

      const duplicate = await prisma.npmPackage.findFirst({
        where: {
          packageName,
          NOT: { id },
        },
        select: { id: true },
      });

      if (duplicate) {
        return {
          success: false,
          message: "Package name already exists.",
        };
      }
    }

    const data = await prisma.npmPackage.update({
      where: { id },
      data: {
        ...(payload.name !== undefined ? { name: payload.name.trim() } : {}),

        ...(payload.packageName !== undefined
          ? { packageName: payload.packageName.trim() }
          : {}),

        ...(payload.description !== undefined
          ? { description: payload.description.trim() }
          : {}),

        ...(payload.npmUrl !== undefined
          ? { npmUrl: payload.npmUrl?.trim() || null }
          : {}),

        ...(payload.githubUrl !== undefined
          ? { githubUrl: payload.githubUrl?.trim() || null }
          : {}),

        ...(payload.demoUrl !== undefined
          ? { demoUrl: payload.demoUrl?.trim() || null }
          : {}),

        ...(payload.image_url !== undefined
          ? { image_url: payload.image_url?.trim() || null }
          : {}),

        ...(payload.version !== undefined
          ? { version: payload.version?.trim() || null }
          : {}),

        ...(payload.tags !== undefined ? { tags: payload.tags } : {}),

        ...(payload.isFeatured !== undefined
          ? { isFeatured: payload.isFeatured }
          : {}),

        ...(payload.priority !== undefined
          ? { priority: payload.priority }
          : {}),
      },
    });

    revalidatePath("/");
    revalidatePath("/works");
    revalidatePath("/admin");
    revalidatePath("/v1/admin");

    return {
      success: true,
      message: "NPM package updated successfully.",
      data,
    };
  } catch (error) {
    console.error("updateNpmPackageAction error:", error);

    return {
      success: false,
      message: "Failed to update NPM package.",
    };
  }
}

export async function deleteNpmPackageAction(
  id: string,
): Promise<ActionResponse> {
  try {
    if (!id?.trim()) {
      return {
        success: false,
        message: "NPM package id is required.",
      };
    }

    const existing = await prisma.npmPackage.findUnique({
      where: { id },
    });

    if (!existing) {
      return {
        success: false,
        message: "NPM package not found.",
      };
    }

    await prisma.npmPackage.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/works");
    revalidatePath("/admin");
    revalidatePath("/v1/admin");

    return {
      success: true,
      message: "NPM package deleted successfully.",
    };
  } catch (error) {
    console.error("deleteNpmPackageAction error:", error);

    return {
      success: false,
      message: "Failed to delete NPM package.",
    };
  }
}

export async function toggleFeaturedNpmPackage(
  id: string,
): Promise<ActionResponse> {
  try {
    if (!id?.trim()) {
      return {
        success: false,
        message: "NPM package id is required.",
      };
    }

    const existing = await prisma.npmPackage.findUnique({
      where: { id },
      select: {
        isFeatured: true,
      },
    });

    if (!existing) {
      return {
        success: false,
        message: "NPM package not found.",
      };
    }

    const data = await prisma.npmPackage.update({
      where: { id },
      data: {
        isFeatured: !existing.isFeatured,
      },
    });

    revalidatePath("/");
    revalidatePath("/works");
    revalidatePath("/admin");
    revalidatePath("/v1/admin");

    return {
      success: true,
      message: `NPM package ${
        data.isFeatured ? "featured" : "unfeatured"
      } successfully.`,
      data,
    };
  } catch (error) {
    console.error("toggleFeaturedNpmPackage error:", error);

    return {
      success: false,
      message: "Failed to toggle featured NPM package.",
    };
  }
}
