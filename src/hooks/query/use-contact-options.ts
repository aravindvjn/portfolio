import { getContactOptionsAction } from "@/actions/contact-option.action";
import { ADMIN_QUERY_KEYS } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";

export function useContactOptions() {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.contactOptions,
    queryFn: getContactOptionsAction,
  });
}