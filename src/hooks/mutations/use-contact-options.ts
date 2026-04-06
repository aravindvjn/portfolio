"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createContactOptionAction,
  deleteContactOptionAction,
  getContactOptionsAction,
  toggleContactOptionStatusAction,
  updateContactOptionAction,
} from "@/actions/contact-option.action";
import { ADMIN_QUERY_KEYS } from "@/lib/query-keys";
import type {
  ContactOptionPayload,
  UpdateContactOptionPayload,
} from "@/types/admin.type";


export function useCreateContactOption() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ContactOptionPayload) =>
      createContactOptionAction(payload),
    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries({
          queryKey: ADMIN_QUERY_KEYS.contactOptions,
        });
      }
    },
  });
}

export function useUpdateContactOption() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateContactOptionPayload) =>
      updateContactOptionAction(payload),
    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries({
          queryKey: ADMIN_QUERY_KEYS.contactOptions,
        });
      }
    },
  });
}

export function useDeleteContactOption() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteContactOptionAction(id),
    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries({
          queryKey: ADMIN_QUERY_KEYS.contactOptions,
        });
      }
    },
  });
}

export function useToggleContactOptionStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => toggleContactOptionStatusAction(id),
    onSuccess: (res) => {
      if (res.success) {
        queryClient.invalidateQueries({
          queryKey: ADMIN_QUERY_KEYS.contactOptions,
        });
      }
    },
  });
}