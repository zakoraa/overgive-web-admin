import { Title } from "@/components/text/title";
import BasePage from "@/layout/base-page";
import DonationCampaignBody from "./components/donation_campaign_body";

export default function DonationCampaign() {
  return (
    <BasePage>
      {/* Header  */}
      <Title size="lg" text="Kampanye Donasi" />

      {/* Body */}
      <DonationCampaignBody />
    </BasePage>
  );
}
