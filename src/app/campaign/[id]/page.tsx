// app/campaign/[id]/page.tsx
import { CampaignPage } from "@/modules/donation_campaign/pages/detail";

interface CampaignPageProps {
  params: { id: string };
}

export default async function Page({ params }: CampaignPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  return <CampaignPage campaignId={id} />;
}
