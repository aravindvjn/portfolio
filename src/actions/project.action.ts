"use server";

import { revalidatePath } from "next/cache";
import type {
  ActionResponse,
  GetProjectsResponse,
  ProjectPayload,
  UpdateProjectPayload,
} from "@/types/admin.type";
import { prisma } from "@/lib/db";
import { ProjectTableItem } from "@/hooks/tables/use-projects";

export async function getProjectsAction(): Promise<GetProjectsResponse> {
  try {
    const data = await prisma.projects.findMany({
      orderBy: [{ priority: "asc" }, { name: "asc" }],
    });

    return {
      success: true,
      message: "Projects fetched successfully.",
      data,
    };
  } catch (error) {
    console.error("getProjectsAction error:", error);
    return {
      success: false,
      message: "Failed to fetch projects.",
    };
  }
}

export async function getProjectByIdAction(
  id: string,
): Promise<ActionResponse> {
  try {
    if (!id?.trim()) {
      return {
        success: false,
        message: "Project id is required.",
      };
    }

    const data = await prisma.projects.findUnique({
      where: { id },
    });

    if (!data) {
      return {
        success: false,
        message: "Project not found.",
      };
    }

    return {
      success: true,
      message: "Project fetched successfully.",
      data,
    };
  } catch (error) {
    console.error("getProjectByIdAction error:", error);
    return {
      success: false,
      message: "Failed to fetch project.",
    };
  }
}

export async function createProjectAction(
  payload: ProjectPayload,
): Promise<ActionResponse> {
  try {
    const name = payload.name?.trim();
    const content = payload.content?.trim();
    const githubLink = payload.githubLink?.trim();
    const image_url = payload.image_url?.trim() || null;
    const priority =
      typeof payload.priority === "number" ? payload.priority : null;

    if (!name || !content || !githubLink) {
      return {
        success: false,
        message: "Name, content, and github link are required.",
      };
    }

    const data = await prisma.projects.create({
      data: {
        name,
        content,
        githubLink,
        image_url,
        priority,
        category: payload.category ?? "PERSONAL",
        tags: payload.tags ?? [],
      },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/v1/admin");

    return {
      success: true,
      message: "Project created successfully.",
      data,
    };
  } catch (error) {
    console.error("createProjectAction error:", error);
    return {
      success: false,
      message: "Failed to create project.",
    };
  }
}

export async function updateProjectAction(
  payload: UpdateProjectPayload,
): Promise<ActionResponse> {
  try {
    const { id } = payload;

    if (!id?.trim()) {
      return {
        success: false,
        message: "Project id is required.",
      };
    }

    const existing = await prisma.projects.findUnique({
      where: { id },
    });

    if (!existing) {
      return {
        success: false,
        message: "Project not found.",
      };
    }

    const data = await prisma.projects.update({
      where: { id },
      data: {
        ...(payload.name !== undefined ? { name: payload.name.trim() } : {}),
        ...(payload.content !== undefined
          ? { content: payload.content.trim() }
          : {}),
        ...(payload.githubLink !== undefined
          ? { githubLink: payload.githubLink.trim() }
          : {}),
        ...(payload.image_url !== undefined
          ? { image_url: payload.image_url?.trim() || null }
          : {}),
        ...(payload.priority !== undefined
          ? { priority: payload.priority }
          : {}),
        ...(payload.category && { category: payload.category }),
        ...(payload.tags && { tags: payload.tags }),
      },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/v1/admin");

    return {
      success: true,
      message: "Project updated successfully.",
      data,
    };
  } catch (error) {
    console.error("updateProjectAction error:", error);
    return {
      success: false,
      message: "Failed to update project.",
    };
  }
}

export async function deleteProjectAction(id: string): Promise<ActionResponse> {
  try {
    if (!id?.trim()) {
      return {
        success: false,
        message: "Project id is required.",
      };
    }

    const existing = await prisma.projects.findUnique({
      where: { id },
    });

    if (!existing) {
      return {
        success: false,
        message: "Project not found.",
      };
    }

    await prisma.projects.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/v1/admin");

    return {
      success: true,
      message: "Project deleted successfully.",
    };
  } catch (error) {
    console.error("deleteProjectAction error:", error);
    return {
      success: false,
      message: "Failed to delete project.",
    };
  }
}

export async function toggleFeaturedProject(
  id: ProjectTableItem["id"],
): Promise<ActionResponse> {
  try {
    if (!id?.trim()) {
      return {
        success: false,
        message: "Project id is required.",
      };
    }

    const existing = await prisma.projects.findUnique({
      where: { id },
      select: {
        isFeatured: true,
      },
    });

    if (!existing) {
      return {
        success: false,
        message: "Project not found.",
      };
    }

    const data = await prisma.projects.update({
      where: { id },
      data: {
        isFeatured: !existing?.isFeatured,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/v1/admin");

    return {
      success: true,
      message: `Project ${data.isFeatured ? "featured" : "unfeatured"} successfully.`,
      data,
    };
  } catch (error) {
    console.error("toggleFeaturedProject error:", error);
    return {
      success: false,
      message: "Failed to toggle featured project.",
    };
  }
}
