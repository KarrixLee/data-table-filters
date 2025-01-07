import type { MakeArray } from "@/types";
import { ColumnSchema } from "./schema";
import { SearchParamsType, searchParamsSerializer } from "./search-params";
import { infiniteQueryOptions, keepPreviousData } from "@tanstack/react-query";
import { Percentile } from "@/lib/request/percentile";

export type InfiniteQueryMeta = {
  totalRowCount: number;
  filterRowCount: number;
  totalFilters: MakeArray<ColumnSchema>;
  currentPercentiles: Record<Percentile, number>;
  chartData: { timestamp: number; [key: string]: number }[];
};

const API_URL = "http://localhost:3011/api/runs";

export const dataOptions = (search: SearchParamsType) => {
  return infiniteQueryOptions({
    queryKey: ["data-table", searchParamsSerializer({ ...search, id: null })], // remove uuid as it would otherwise retrigger a fetch
    queryFn: async ({ pageParam = 0 }) => {
      const offset = (pageParam as number) * search.limit;
      const serialize = searchParamsSerializer({ ...search, offset });
      const response = await fetch(`${API_URL}${serialize}`, {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`,
        },
      });

      return response.json() as Promise<{
        data: ColumnSchema[];
        meta: InfiniteQueryMeta;
      }>;
    },
    initialPageParam: 0,
    getNextPageParam: (_lastGroup, groups) => groups.length,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
};
