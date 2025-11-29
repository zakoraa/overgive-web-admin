import { Title } from "@/components/text/title";
import { Line } from "@/components/ui/line";
import { CreateDistributorAssignmentForm } from "./components/create-distributor-assignment-form";

export const CreateDistributorAssignment = () => {
  return (
    <main className="container px-4 py-5 lg:px-8">
      <Title text="Tambah Penugasan Distributor" />
      <p className="text-sm text-gray-500">
        Buat penugasan baru untuk distributor agar mereka dapat menjalankan
        kampanye dengan jelas dan terstruktur. Isi informasi penting seperti
        distributor yang ditugaskan dan catatan tambahan untuk memastikan
        koordinasi yang tepat.
      </p>
      <Line />
      <CreateDistributorAssignmentForm />
    </main>
  );
};
