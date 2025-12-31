"use client";

import { notFound } from "next/navigation";
import { DonationSettlement } from "./components/donation-settlement";
import { useGetDonationSettlementSummaryByCampaign } from "./hooks/use-get-donation-settlements-by-campaign";
import { ModalLoading } from "@/core/components/ui/modal/modal-loading";

interface Props {
  campaignId: string;
}

export const DonationSettlementPage = ({ campaignId }: Props) => {
  const {
    data: summary,
    isLoading,
    isError,
  } = useGetDonationSettlementSummaryByCampaign(campaignId);

  if (isLoading) {
    return <ModalLoading isOpen />;
  }

  if (isError || !summary) {
    return notFound();
  }

  return <DonationSettlement summary={summary} />;
};
