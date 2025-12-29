import BasePage from "@/core/layout/base-page";
import DonationSettlementCampaignBody from "./components/donation-settlement-campaign-body";
import { Title } from "@/core/components/text/title";
import { GetCampaignsWithSettlementsProvider } from "../../providers/get-campaigns-with-settlements-provider";

export default function DonationSettlementCampaign() {
  return (
    <BasePage>
      {/* Header  */}
      <Title size="lg" text="Operasional Kampanye" />

      {/* Body */}
      <GetCampaignsWithSettlementsProvider>
        <DonationSettlementCampaignBody />
      </GetCampaignsWithSettlementsProvider>
    </BasePage>
  );
}
