"use client";

import {
  createNpmPackageAction,
  deleteNpmPackageAction,
  toggleFeaturedNpmPackage,
  updateNpmPackageAction,
} from "@/actions/npm-package.action";

import { ADMIN_QUERY_KEYS } from "@/lib/query-keys";
import {
  NpmPackagePayload,
  UpdateNpmPackagePayload,
} from "@/actions/npm-package.action";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


export function useCreateNpmPackage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: NpmPackagePayload) =>
      createNpmPackageAction(payload),

    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries({
          queryKey: ADMIN_QUERY_KEYS.npmPackages,
        });
        toast.success(res.message);
      }
    },
  });
}

export function useUpdateNpmPackage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateNpmPackagePayload) =>
      updateNpmPackageAction(payload),

    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries({
          queryKey: ADMIN_QUERY_KEYS.npmPackages,
        });
        toast.success(res.message);
      }
    },
  });
}

export function useDeleteNpmPackage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteNpmPackageAction(id),

    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries({
          queryKey: ADMIN_QUERY_KEYS.npmPackages,
        });
        toast.success(res.message);
      }
    },
  });
}

export function useToggleFeaturedNpmPackage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => toggleFeaturedNpmPackage(id),

    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries({
          queryKey: ADMIN_QUERY_KEYS.npmPackages,
        });
        toast.success(res.message);
      }
    },

    onError: (error) => {
      const errorMessage =
        typeof error?.message === "string"
          ? error.message
          : "Something went wrong";

      if (!errorMessage.includes("NEXT_REDIRECT")) {
        toast.error(errorMessage);
      }
    },
  });
}