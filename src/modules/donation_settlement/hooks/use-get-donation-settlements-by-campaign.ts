"use client";

import { useQuery } from "@tanstack/react-query";
import { getDonationSettlementSummaryByCampaign } from "../services/get-donation-settlement-summary-by-campaign";
import { DonationSettlementSummary } from "../types/donation-settlement";

export const useDonationSettlementSummaryByCampaign = (campaignId: string) => {
  const query = useQuery<DonationSettlementSummary | null>({
    queryKey: ["donation-settlement-summary", campaignId],
    queryFn: () => getDonationSettlementSummaryByCampaign(campaignId),
    enabled: !!campaignId,
    staleTime: 5 * 60 * 1000,      
    gcTime: 30 * 60 * 1000,     
    refetchOnWindowFocus: false,   
    retry: 1,                       
  });

  return {
    data: query.data,
    loading: query.isLoading,
    error: query.error instanceof Error ? query.error.message : null,
    reload: query.refetch,
  };
};
