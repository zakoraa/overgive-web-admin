"use client";

import BasePage from "@/core/layout/base-page";
import { CampaignBackgroundCard } from "./components/campaign-background-card";
import { CampaignHeaderCard } from "./components/campaign-header-card";
import { CampaignDonorsCard } from "./components/campaign_donors_card";
import { CampaignLatestNewsCard } from "./components/campaign-latest-news-card";
import { CampaignDetailsOfFundCard } from "./components/campaign-details-of-fund-card";
import { CampaignDetailProvider } from "./providers/campaign-detail-provider";
import { useCampaignDetails } from "./hooks/use-campaign-detail";
import { ModalLoading } from "@/core/components/ui/modal/modal-loading";
import { GetDonationsProvider } from "@/modules/donation/providers/get-donations-provider";

interface CampaignProps {
  campaignId: string;
}

export const Campaign = ({ campaignId }: CampaignProps) => {
  const { loading, campaign, isError } = useCampaignDetails(campaignId);

  return (
    <BasePage className="mx-auto min-w-[50%]! space-y-2! border-none bg-transparent py-0! md:w-[50%]!">
      {loading && <ModalLoading isOpen />}
      {isError && (
        <p className="mx-auto text-center text-sm text-gray-500">
          {" "}
          Kampanye tidak ditemukan
        </p>
      )}
      {!loading && campaign && (
        <CampaignDetailProvider initialCampaign={campaign}>
          <CampaignHeaderCard />
          <CampaignBackgroundCard />
          <CampaignLatestNewsCard campaign={campaign} />
          <CampaignDetailsOfFundCard campaignId={campaign.id} />
          <GetDonationsProvider campaign_id={campaign.id}>
            <CampaignDonorsCard />
          </GetDonationsProvider>
        </CampaignDetailProvider>
      )}
    </BasePage>
  );
};
