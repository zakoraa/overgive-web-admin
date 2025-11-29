import { Title } from "@/core/components/text/title";
import BasePage from "@/core/layout/base-page";
import DonationCampaignBody from "./components/donation-campaign-body";
import { CampaignTableProvider } from "./providers/campaign-table-provider";

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
