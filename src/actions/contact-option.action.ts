"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import type {
  CreateContactOptionResponse,
  DeleteContactOptionResponse,
  GetContactOptionsResponse,
  ToggleContactOptionResponse,
  ContactOptionPayload,
  UpdateContactOptionPayload,
  UpdateContactOptionResponse,
} from "@/types/admin.type";

export async function getContactOptionsAction(): Promise<GetContactOptionsResponse> {
  try {
    const data = await prisma.contactOption.findMany({
      orderBy: [{ priority: "asc" }, { createdAt: "desc" }],
    });

    return {
      success: true,
      message: "Contact options fetched successfully.",
      data,
    };
  } catch (error) {
    console.error("getContactOptionsAction error:", error);
    return {
      success: false,
      message: "Failed to fetch contact options.",
      data: [],
    };
  }
}

export async function createContactOptionAction(
  payload: ContactOptionPayload,
): Promise<CreateContactOptionResponse> {
  try {
    const label = payload.label?.trim();
    const link = payload.link?.trim();
    const icon = payload.icon?.trim() || null;
    const priority =
      typeof payload.priority === "number" ? payload.priority : null;
    const isActive = payload.isActive ?? true;

    if (!label || !link) {
      return {
        success: false,
        message: "Label and link are required.",
      };
    }

    const data = await prisma.contactOption.create({
      data: {
        label,
        link,
        icon,
        priority,
        isActive,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/v1/admin");

    return {
      success: true,
      message: "Contact option created successfully.",
      data,
    };
  } catch (error) {
    console.error("createContactOptionAction error:", error);
    return {
      success: false,
      message: "Failed to create contact option.",
    };
  }
}

export async function updateContactOptionAction(
  payload: UpdateContactOptionPayload,
): Promise<UpdateContactOptionResponse> {
  try {
    const { id } = payload;

    if (!id?.trim()) {
      return {
        success: false,
        message: "Contact option id is required.",
      };
    }

    const existing = await prisma.contactOption.findUnique({
      where: { id },
    });

    if (!existing) {
      return {
        success: false,
        message: "Contact option not found.",
      };
    }

    const data = await prisma.contactOption.update({
      where: { id },
      data: {
        ...(payload.label !== undefined ? { label: payload.label.trim() } : {}),
        ...(payload.link !== undefined ? { link: payload.link.trim() } : {}),
        ...(payload.icon !== undefined
          ? { icon: payload.icon?.trim() || null }
          : {}),
        ...(payload.priority !== undefined
          ? { priority: payload.priority }
          : {}),
        ...(payload.isActive !== undefined
          ? { isActive: payload.isActive }
          : {}),
      },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/v1/admin");

    return {
      success: true,
      message: "Contact option updated successfully.",
      data,
    };
  } catch (error) {
    console.error("updateContactOptionAction error:", error);
    return {
      success: false,
      message: "Failed to update contact option.",
    };
  }
}

export async function deleteContactOptionAction(
  id: string,
): Promise<DeleteContactOptionResponse> {
  try {
    if (!id?.trim()) {
      return {
        success: false,
        message: "Contact option id is required.",
      };
    }

    const existing = await prisma.contactOption.findUnique({
      where: { id },
    });

    if (!existing) {
      return {
        success: false,
        message: "Contact option not found.",
      };
    }

    await prisma.contactOption.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/v1/admin");

    return {
      success: true,
      message: "Contact option deleted successfully.",
      data: null,
    };
  } catch (error) {
    console.error("deleteContactOptionAction error:", error);
    return {
      success: false,
      message: "Failed to delete contact option.",
      data: null,
    };
  }
}

export async function toggleContactOptionStatusAction(
  id: string,
): Promise<ToggleContactOptionResponse> {
  try {
    if (!id?.trim()) {
      return {
        success: false,
        message: "Contact option id is required.",
      };
    }

    const existing = await prisma.contactOption.findUnique({
      where: { id },
    });

    if (!existing) {
      return {
        success: false,
        message: "Contact option not found.",
      };
    }

    const data = await prisma.contactOption.update({
      where: { id },
      data: {
        isActive: !existing.isActive,
      },
    });

    revalidatePath("/");
    revalidatePath("/admin");
    revalidatePath("/v1/admin");

    return {
      success: true,
      message: "Contact option status updated successfully.",
      data,
    };
  } catch (error) {
    console.error("toggleContactOptionStatusAction error:", error);
    return {
      success: false,
      message: "Failed to update contact option status.",
    };
  }
}