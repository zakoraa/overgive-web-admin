import { getCampaignDetails } from "@/modules/donation_campaign/pages/detail/services/get-campaign-details";
import { EditDonationCampaignPage } from "@/modules/donation_campaign/pages/edit";
import { notFound } from "next/navigation";

interface CampaignPageProps {
  params: { id: string };
}

export default async function Page({ params }: CampaignPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  return <EditDonationCampaignPage campaignId={id} />;
}


