// donation-settlement/[id]/page.tsx
import { DonationSettlement } from "@/modules/donation_settlement/pages/detail";
import { getDonationSettlementSummaryByCampaign } from "@/modules/donation_settlement/services/get-donation-settlement-summary-by-campaign";
import { notFound } from "next/navigation";

interface DonationSettlementPageProps {
  params: { id: string };
}

export default async function Page({ params }: DonationSettlementPageProps) {
  const resolvedParams = await params;
  const { id: campaignId } = resolvedParams;
  if (!campaignId) return notFound();

  try {
    const summary = await getDonationSettlementSummaryByCampaign(campaignId);

    if (!summary) return notFound();

    return <DonationSettlement summary={summary} />;
  } catch {
    return notFound();
  }
}
