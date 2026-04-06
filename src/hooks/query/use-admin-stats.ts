"use client";

import { useQuery } from "@tanstack/react-query";
import { getAdminStatsAction } from "@/actions/admin-stats.action";
import { ADMIN_QUERY_KEYS } from "@/lib/query-keys";

export function useAdminStats() {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.stats,
    queryFn: getAdminStatsAction,
  });
}