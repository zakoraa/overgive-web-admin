"use client";

import { ModalLoading } from "@/core/components/ui/modal/modal-loading";
import { useCampaignDetails } from "../detail/hooks/use-campaign-detail";
import { EditDonationCampaign } from "./components/edit-donation-campaign";

interface EditCampaignPageProps {
  campaignId: string;
}

export const EditDonationCampaignPage = ({
  campaignId,
}: EditCampaignPageProps) => {
  const { campaign, loading, error } = useCampaignDetails(campaignId);

  if (loading) return <ModalLoading isOpen />;
  if (error || !campaign)
    return (
      <p>Terjadi kesalahan: {error?.message ?? "Campaign tidak ditemukan"}</p>
    );

  return <EditDonationCampaign initialCampaign={campaign} />;
};
