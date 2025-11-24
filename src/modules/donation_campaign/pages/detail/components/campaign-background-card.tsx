"use client";

import { Title } from "@/components/text/title";
import { Card } from "@/components/ui/card";
import { useCampaignDetailContext } from "@/modules/donation_campaign/providers/campaign-detail-provider";

export const CampaignBackgroundCard = () => {
  const { campaign } = useCampaignDetailContext();

  if (!campaign) return null;

  return (
    <Card className="space-y-3 px-5 py-5 text-sm">
      <Title text="Latar Belakang" />

      {/* Render HTML dari campaign.backgroundHtml */}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: campaign.backgroundHtml }}
      />
    </Card>
  );
};
