// app/campaign/[id]/page.tsx
import { Campaign } from "@/modules/donation_campaign/pages/detail";
import { getCampaignDetail } from "@/modules/donation_campaign/services/campaign-service";
import { notFound } from "next/navigation";

interface CampaignPageProps {
  params: { id: string };
}

export default async function Page({ params }: CampaignPageProps) {
  // jika params ini promise (ReactServerComponent)
  const resolvedParams = await params;
  const { id } = resolvedParams;

  console.log("IDNYA:", id); // sekarang muncul string ID

  const campaign = await getCampaignDetail(id);

  if (!campaign) return notFound();

  return <Campaign initialCampaign={campaign} />;
}
