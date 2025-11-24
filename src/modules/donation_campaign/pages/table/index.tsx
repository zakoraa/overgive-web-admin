import { Title } from "@/components/text/title";
import BasePage from "@/layout/base-page";
import DonationCampaignBody from "./components/donation_campaign_body";
import { CampaignTableProvider } from "../../providers/campaign-table-provider";

export default function DonationCampaign() {
  return (
    <BasePage>
      {/* Header  */}
      <Title size="lg" text="Kampanye Donasi" />

      {/* Body */}
      <CampaignTableProvider>
        <DonationCampaignBody />
      </CampaignTableProvider>
    </BasePage>
  );
}
