import { Title } from "@/components/text/title";
import { Line } from "@/components/ui/line";
import { CreateDonationCampaignForm } from "./components/create-donation-campaign-form";

export const AddDonationCampaign = () => {
  return (
    <main className="container px-4 py-5 lg:px-8">
      <Title text="Tambah Kampanye Donasi" />
      <p className="text-sm text-gray-500">
        Buat kampanye baru untuk menggalang dana dan bantu mereka yang
        membutuhkan. Isi informasi penting agar donatur percaya dan cepat
        bertindak.{" "}
      </p>
      <Line />
      <CreateDonationCampaignForm />
    </main>
  );
};
