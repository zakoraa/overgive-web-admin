"use client";

import { useQuery } from "@tanstack/react-query";
import { getDonationSettlementSummaryByCampaign } from "../services/get-donation-settlement-summary-by-campaign";

export const useGetDonationSettlementSummaryByCampaign = (
  campaignId?: string
) => {
  return useQuery({
    queryKey: ["donation_settlement_summary", campaignId],
    queryFn: () => getDonationSettlementSummaryByCampaign(campaignId!),
    enabled: !!campaignId,

    staleTime: 0,                 
    refetchOnWindowFocus: true,   
    refetchOnMount: "always",     
    retry: 1,
  });
};
