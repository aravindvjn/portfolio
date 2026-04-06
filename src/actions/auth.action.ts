"use server";

import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signAuthToken, verifyAuthToken } from "@/lib/helpers/auth";
import type { LoginPayload, LoginState } from "@/types/auth";

export const loginAction = async ({
  email,
  password,
}: LoginPayload): Promise<LoginState> => {
  try {
    const normalizedEmail = String(email ?? "").trim();
    const normalizedPassword = String(password ?? "").trim();

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPasswordHash = process.env.ADMIN_PASSWORD?.trim();

    if (!adminEmail || !adminPasswordHash) {
      return {
        success: false,
        message: "Auth environment variables are not configured.",
      };
    }

    if (!normalizedEmail || !normalizedPassword) {
      return {
        success: false,
        message: "Email and password are required.",
      };
    }

    const isEmailValid =
      normalizedEmail.toLowerCase() === adminEmail.toLowerCase();

    if (!isEmailValid) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const isPasswordValid = await bcrypt.compare(
      normalizedPassword,
      adminPasswordHash
    );

    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    const token = signAuthToken({
      email: adminEmail,
      role: "admin",
    });

    const cookieStore = await cookies();

    cookieStore.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return {
      success: true,
      message: "Login successful.",
    };
  } catch (error) {
    console.error("loginAction error:", error);

    return {
      success: false,
      message: "Something went wrong.",
    };
  }
};


export const logoutAction = async () => {
  const cookieStore = await cookies();

  cookieStore.set("admin_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });

  redirect("/v1/login");
};

export const getCurrentAdmin = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) return null;

  const payload = verifyAuthToken(token);

  if (!payload || payload.role !== "admin") {
    return null;
  }

  return payload;
};

export const checkIsAdmin = async () => {
  const admin = await getCurrentAdmin();
  return !!admin;
};
