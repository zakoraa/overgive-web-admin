// donation-settlement/[id]/page.tsx
import { DonationSettlementPage } from "@/modules/donation_settlement/pages/detail";

interface DonationSettlementPageProps {
  params: { id: string };
}

export default async function Page({ params }: DonationSettlementPageProps) {
  const resolvedParams = await params;
  const { id: campaignId } = resolvedParams;

  return <DonationSettlementPage campaignId={campaignId} />;
}
