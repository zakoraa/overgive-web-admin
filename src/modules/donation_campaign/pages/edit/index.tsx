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
  const { data, loading, error, reload } = useCampaignDetails(campaignId);

  if (loading) return <ModalLoading isOpen />;
  if (error || !data)
    return <p>Terjadi kesalahan: {error ?? "Campaign tidak ditemukan"}</p>;

  return <EditDonationCampaign initialCampaign={data} />;
};
