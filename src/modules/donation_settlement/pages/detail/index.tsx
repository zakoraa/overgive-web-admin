"use client";

import { ModalLoading } from "@/core/components/ui/modal/modal-loading";
import { DonationSettlement } from "./components/donation-settlement";
import { useGetDonationSettlementSummaryByCampaign } from "../../hooks/use-get-donation-settlements-by-campaign";

interface DonationSettlementPageProps {
  campaignId: string;
}

export const DonationSettlementPage = ({
  campaignId,
}: DonationSettlementPageProps) => {
  const {
    data,
    isLoading,
    isError,
  } = useGetDonationSettlementSummaryByCampaign(campaignId);

  if (isLoading) return <ModalLoading isOpen />;
  if (isError || !data)
    return <p>Terjadi kesalahan: {isError ?? "Summary tidak ditemukan"}</p>;

  return <DonationSettlement summary={data} />;
};
