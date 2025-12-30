"use client";

import { ModalLoading } from "@/core/components/ui/modal/modal-loading";
import { DonationSettlement } from "./components/donation-settlement";
import { useDonationSettlementSummaryByCampaign } from "../../hooks/use-get-donation-settlements-by-campaign";

interface DonationSettlementPageProps {
  campaignId: string;
}

export const DonationSettlementPage = ({
  campaignId,
}: DonationSettlementPageProps) => {
  const { data, loading, error, reload } =
    useDonationSettlementSummaryByCampaign(campaignId);

  if (loading) return <ModalLoading isOpen />;
  if (error || !data)
    return <p>Terjadi kesalahan: {error ?? "Summary tidak ditemukan"}</p>;

  return <DonationSettlement summary={data} />;
};
