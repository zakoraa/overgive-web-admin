import { Title } from "@/core/components/text/title";
import { Line } from "@/core/components/ui/line";
import { Campaign as CampaignType } from "../../../types/campaign";
import { CampaignDetailProvider } from "../../detail/providers/campaign-detail-provider";
import { EditDonationCampaignForm } from "./edit-donation-campaign-form";

interface EditDonationCampaignProps {
  initialCampaign: CampaignType;
}

export const EditDonationCampaign = ({
  initialCampaign,
}: EditDonationCampaignProps) => {
  return (
    <main className="container px-4 py-5 lg:px-8">
      <Title text="Edit Kampanye Donasi" />
      <p className="text-sm text-gray-500">
        Perbarui informasi kampanye untuk memastikan setiap detail tetap jelas,
        akurat, dan meyakinkan bagi para calon donatur. Lengkapi deskripsi,
        tujuan, serta kebutuhan terkini agar dukungan yang diterima dapat
        tersalurkan dengan tepat dan berdampak nyata.
      </p>
      <Line />
      <CampaignDetailProvider initialCampaign={initialCampaign}>
        <EditDonationCampaignForm />
      </CampaignDetailProvider>
    </main>
  );
};
