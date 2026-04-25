import { getNpmPackagesAction } from "@/actions/npm-package.action";
import { ADMIN_QUERY_KEYS } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";

export function useNpmPackages() {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.npmPackages,
    queryFn: getNpmPackagesAction,
  });
}
