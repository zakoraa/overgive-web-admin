"use client";

import { Title } from "@/core/components/text/title";
import { Line } from "@/core/components/ui/line";
import { ModalLoading } from "@/core/components/ui/modal/modal-loading";
import { EditDistributorForm } from "./components/edit-distributor-assignment";
import {
  DistributorByIdProvider,
  useDistributorByIdContext,
} from "../../providers/distributor-by-id-provider";

interface EditDistributorProps {
  distributorId: string;
}

export const EditDistributor = ({ distributorId }: EditDistributorProps) => {
  return (
    <DistributorByIdProvider distributorId={distributorId}>
      <EditDistributorContent />
    </DistributorByIdProvider>
  );
};

const EditDistributorContent = () => {
  const { data, loading, error } = useDistributorByIdContext();

  if (loading) return <ModalLoading isOpen />;
  if (error || !data)
    return <p>Terjadi kesalahan: {error ?? "Data tidak ditemukan"}</p>;

  return (
    <main className="container px-4 py-5 lg:px-8">
      <Title text="Edit Penugasan Distributor" />
      <p className="text-sm text-gray-500">
        Perbarui data distributor agar sesuai dengan data diri distributor.
      </p>
      <Line />
      <EditDistributorForm />
    </main>
  );
};
