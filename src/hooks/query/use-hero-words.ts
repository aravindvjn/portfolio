import { getHeroWordsAction } from "@/actions/hero-word.action";
import { ADMIN_QUERY_KEYS } from "@/lib/query-keys";
import { useQuery } from "@tanstack/react-query";

export function useHeroWords() {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.heroWords,
    queryFn: getHeroWordsAction,
  });
}
