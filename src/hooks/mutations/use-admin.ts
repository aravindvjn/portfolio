"use client";

import { useMutation } from "@tanstack/react-query";
import {
  type LoginPayload,
  type LoginState,
} from "@/types/auth";
import { loginAction } from "@/actions/auth.action";

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
        : mutation.error?.message ?? "",
    isLoginSuccess: !!mutation.data?.success,
  };
};