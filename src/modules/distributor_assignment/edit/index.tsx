"use client";

import { Title } from "@/core/components/text/title";
import { Line } from "@/core/components/ui/line";
import { AssignmentDetailProvider } from "./providers/edit-assignment-provider";
import { EditDistributorAssignmentForm } from "./components/edit-distributor-assignment-form";
import { useAssignmentDetail } from "./hooks/use-assignment-detail";
import { ModalLoading } from "@/core/components/ui/modal/modal-loading";

interface EditDistributorAssignmentProps {
  assignmentId: string;
}

export const EditDistributorAssignment = ({
  assignmentId,
}: EditDistributorAssignmentProps) => {
  const { data, loading, error, reload } = useAssignmentDetail(assignmentId);

  if (loading) return <ModalLoading isOpen />;
  if (error || !data)
    return <p>Terjadi kesalahan: {error ?? "Data tidak ditemukan"}</p>;

  return (
    <main className="container px-4 py-5 lg:px-8">
      <Title text="Edit Penugasan Distributor" />
      <p className="text-sm text-gray-500">
        Perbarui informasi penugasan distributor agar pelaksanaan kampanye tetap
        berjalan jelas, terstruktur, dan sesuai kebutuhan.
      </p>
      <Line />
      <AssignmentDetailProvider initialAssignment={data}>
        <EditDistributorAssignmentForm />
      </AssignmentDetailProvider>
    </main>
  );
};
