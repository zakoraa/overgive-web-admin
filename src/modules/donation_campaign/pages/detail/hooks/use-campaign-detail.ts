"use client";

import { useQuery } from "@tanstack/react-query";
import { getCampaignDetails } from "../services/get-campaign-details";
import { Campaign } from "@/modules/donation_campaign/types/campaign";

export function useCampaignDetails(id: string) {
  const query = useQuery<Campaign | null>({
    queryKey: ["campaign-details", id],
    queryFn: () => getCampaignDetails(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000,
    gcTime: 60 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: 1,
    refetchOnReconnect: true,
  });

  return {
    data: query.data,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    reload: query.refetch,
  };
}
