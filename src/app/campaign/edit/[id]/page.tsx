import { getCampaignDetails } from "@/modules/donation_campaign/pages/detail/services/get-campaign-details";
import { EditDonationCampaign } from "@/modules/donation_campaign/pages/edit";
import { notFound } from "next/navigation";

interface CampaignPageProps {
  params: { id: string };
}

export default async function Page({ params }: CampaignPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const campaign = await getCampaignDetails(id);

  if (!campaign) return notFound();

  return <EditDonationCampaign initialCampaign={campaign} />;
}


