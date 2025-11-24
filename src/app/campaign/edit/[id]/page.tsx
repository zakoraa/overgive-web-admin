import { EditDonationCampaign } from "@/modules/donation_campaign/pages/edit";
import { getCampaignDetail } from "@/modules/donation_campaign/services/campaign-service";
import { notFound } from "next/navigation";

interface CampaignPageProps {
  params: { id: string };
}

export default async function Page({ params }: CampaignPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const campaign = await getCampaignDetail(id);

  if (!campaign) return notFound();

  return <EditDonationCampaign initialCampaign={campaign} />;
}
