"use client";

import { useQuery } from "@tanstack/react-query";
import { getAssignmentDetail } from "../services/get-assignment-detail";
import { AssignmentDetail } from "../types/assignment-detail"; // sesuaikan tipe datanya

export function useAssignmentDetail(id: string) {
  const query = useQuery<AssignmentDetail | null>({
    queryKey: ["assignment-detail", id],
    queryFn: () => getAssignmentDetail(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  return {
    data: query.data,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    reload: query.refetch,
  };
}
