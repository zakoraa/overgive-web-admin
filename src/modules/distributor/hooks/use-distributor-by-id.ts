"use client";

import { useQuery } from "@tanstack/react-query";
import { getDistributorById } from "../services/get-distributor-by-id";
import { User } from "@/core/types/user";

export function useDistributorById(id: string) {
    const query = useQuery<User | null | undefined>({
        queryKey: ["distributor", id],
        queryFn: () => getDistributorById(id),
        enabled: !!id,
        staleTime: 10 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
        refetchOnWindowFocus: true,
        retry: 1,
    });

    return {
        data: query.data,
        loading: query.isLoading,
        error: query.error instanceof Error ? query.error.message : null,
        reload: query.refetch,
    };
}
