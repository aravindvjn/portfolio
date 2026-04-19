"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createHeroWordAction,
  deleteHeroWordAction,
  updateHeroWordAction,
} from "@/actions/hero-word.action";
import { ADMIN_QUERY_KEYS } from "@/lib/query-keys";
import type {
  HeroWordPayload,
  UpdateHeroWordPayload,
} from "@/types/admin.type";

export function useCreateHeroWord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: HeroWordPayload) => createHeroWordAction(payload),
    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries({
          queryKey: ADMIN_QUERY_KEYS.heroWords,
        });
      }
    },
  });
}

export function useUpdateHeroWord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateHeroWordPayload) =>
      updateHeroWordAction(payload),
    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries({
          queryKey: ADMIN_QUERY_KEYS.heroWords,
        });
      }
    },
  });
}

export function useDeleteHeroWord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteHeroWordAction(id),
    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries({
          queryKey: ADMIN_QUERY_KEYS.heroWords,
        });
      }
    },
  });
}