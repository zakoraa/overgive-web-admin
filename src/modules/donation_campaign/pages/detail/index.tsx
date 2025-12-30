"use client";

import { ModalLoading } from "@/core/components/ui/modal/modal-loading";
import { Campaign } from "./components/campaign";
import { useCampaignDetails } from "./hooks/use-campaign-detail";

interface CampaignPageProps {
  campaignId: string;
}

export const CampaignPage = ({ campaignId }: CampaignPageProps) => {
  const { data, loading, error, reload } = useCampaignDetails(campaignId);

  if (loading) return <ModalLoading isOpen />;
  if (error || !data)
    return <p>Terjadi kesalahan: {error ?? "Campaign tidak ditemukan"}</p>;

  return <Campaign initialCampaign={data} />;
};
