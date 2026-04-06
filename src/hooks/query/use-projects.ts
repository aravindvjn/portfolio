"use client";

import { useQuery } from "@tanstack/react-query";
import { getProjectsAction } from "@/actions/project.action";
import { ADMIN_QUERY_KEYS } from "@/lib/query-keys";

export function useProjects() {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.projects,
    queryFn: getProjectsAction,
  });
}
