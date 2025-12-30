import { Campaign as CampaignType } from "../../../types/campaign";
import { Card } from "@/core/components/ui/card";
import { CampaignDetailProvider } from "../providers/campaign-detail-provider";
import { CampaignBackgroundCard } from "./campaign-background-card";
import { CampaignHeaderCard } from "./campaign-header-card";

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
