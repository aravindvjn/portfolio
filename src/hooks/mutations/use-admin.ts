"use client";

import { useMutation } from "@tanstack/react-query";
import { type LoginPayload, type LoginState } from "@/types/auth";
import { loginAction, logoutAction } from "@/actions/auth.action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useAdminLogin = () => {
  const mutation = useMutation<LoginState, Error, LoginPayload>({
    mutationFn: async (payload) => {
      return await loginAction(payload);
    },
  });

  return {
    ...mutation,
    login: mutation.mutate,
    loginAsync: mutation.mutateAsync,
    errorMessage:
      mutation.data && !mutation.data.success
        ? mutation.data.message
        : (mutation.error?.message ?? ""),
    isLoginSuccess: !!mutation.data?.success,
  };
};

export const useAdminLogout = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async () => {
      return await logoutAction();
    },
    onSuccess: () => {
      router.push("/v1/admin");
    },
    onError: (error) => {
      const errorMessage =
        typeof error?.message === "string"
          ? error?.message
          : "Something went wrong";
      if (!errorMessage?.includes("NEXT_REDIRECT")) {
        toast.error(errorMessage);
      }
    },
  });
  return {
    ...mutation,
    logout: mutation.mutate,
    logoutAsync: mutation.mutateAsync,
  };
};
