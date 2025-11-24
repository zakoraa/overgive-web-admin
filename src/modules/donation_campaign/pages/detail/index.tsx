import { CampaignBackgroundCard } from "./components/campaign-background-card";
import { CampaignHeaderCard } from "./components/campaign-header-card";
import { CampaignDonorsCard } from "./components/campaign_donors_card";
import { CampaignLatestNewsCard } from "./components/campaign-latest-news-card";
import { CampaignDetailsOfFundCard } from "./components/campaign-details-of-fund-card";
import { CampaignDetailProvider } from "../../providers/campaign-detail-provider";
import { Campaign as CampaignType } from "../../types/campaign";
import { Card } from "@/components/ui/card";

interface CampaignProps {
  initialCampaign: CampaignType;
}

export const Campaign = ({ initialCampaign }: CampaignProps) => {
  return (
    <Card
      className={`container mx-auto flex flex-col items-center justify-center space-y-2 rounded-none border-none bg-transparent pb-5 md:max-w-[550px]`}
    >
      <CampaignDetailProvider initialCampaign={initialCampaign}>
        <CampaignHeaderCard />
        <CampaignBackgroundCard />
        {/* <CampaignLatestNewsCard /> */}
        {/* <CampaignDetailsOfFundCard /> */}
        {/* <CampaignDonorsCard /> */}
      </CampaignDetailProvider>
    </Card>
  );
};
