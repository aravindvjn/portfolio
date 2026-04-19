"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import type {
  ActionResponse,
  GetHeroWordsResponse,
  HeroWordPayload,
  UpdateHeroWordPayload,
} from "@/types/admin.type";

export async function getHeroWordsAction(): Promise<GetHeroWordsResponse> {
  try {
    const data = await prisma.heroWord.findMany({
      orderBy: [
        { priority: "asc" },
        { createdAt: "desc" },
      ],
    });

    return {
      success: true,
      message: "Hero words fetched successfully.",
      data,
    };
  } catch (error) {
    console.error("getHeroWordsAction error:", error);
    return {
      success: false,
      message: "Failed to fetch hero words.",
    };
  }
}

export async function createHeroWordAction(
  payload: HeroWordPayload
): Promise<ActionResponse> {
  try {
    const text = payload.text?.trim();
    const priority =
      typeof payload.priority === "number" ? payload.priority : null;

    if (!text) {
      return {
        success: false,
        message: "Text is required.",
      };
    }

    const exists = await prisma.heroWord.findUnique({
      where: { text },
    });

    if (exists) {
      return {
        success: false,
        message: "Hero word already exists.",
      };
    }

    const data = await prisma.heroWord.create({
      data: {
        text,
        priority,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/v1/admin");

    return {
      success: true,
      message: "Hero word created successfully.",
      data,
    };
  } catch (error) {
    console.error("createHeroWordAction error:", error);
    return {
      success: false,
      message: "Failed to create hero word.",
    };
  }
}

export async function updateHeroWordAction(
  payload: UpdateHeroWordPayload
): Promise<ActionResponse> {
  try {
    const { id } = payload;

    if (!id?.trim()) {
      return {
        success: false,
        message: "Hero word id is required.",
      };
    }

    const existing = await prisma.heroWord.findUnique({
      where: { id },
    });

    if (!existing) {
      return {
        success: false,
        message: "Hero word not found.",
      };
    }

    const data = await prisma.heroWord.update({
      where: { id },
      data: {
        ...(payload.text !== undefined ? { text: payload.text.trim() } : {}),
        ...(payload.priority !== undefined
          ? { priority: payload.priority }
          : {}),
      },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/v1/admin");

    return {
      success: true,
      message: "Hero word updated successfully.",
      data,
    };
  } catch (error) {
    console.error("updateHeroWordAction error:", error);
    return {
      success: false,
      message: "Failed to update hero word.",
    };
  }
}

export async function deleteHeroWordAction(
  id: string
): Promise<ActionResponse> {
  try {
    if (!id?.trim()) {
      return {
        success: false,
        message: "Hero word id is required.",
      };
    }

    const existing = await prisma.heroWord.findUnique({
      where: { id },
    });

    if (!existing) {
      return {
        success: false,
        message: "Hero word not found.",
      };
    }

    await prisma.heroWord.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/v1/admin");

    return {
      success: true,
      message: "Hero word deleted successfully.",
    };
  } catch (error) {
    console.error("deleteHeroWordAction error:", error);
    return {
      success: false,
      message: "Failed to delete hero word.",
    };
  }
}