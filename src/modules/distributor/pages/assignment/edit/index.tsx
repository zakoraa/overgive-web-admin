import { Title } from "@/core/components/text/title";
import { Line } from "@/core/components/ui/line";
import { AssignmentDetailProvider } from "./providers/edit-assignment-provider";
import { EditDistributorAssignmentForm } from "./components/edit-distributor-assignment-form";
import { AssignmentDetail } from "./types/assignment-detail";

interface EditDistributorAssignmentProps {
  initialAssignment: AssignmentDetail;
}

export const EditDistributorAssignment = ({
  initialAssignment,
}: EditDistributorAssignmentProps) => {
  return (
    <main className="container px-4 py-5 lg:px-8">
      <Title text="Edit Penugasan Distributor" />
      <p className="text-sm text-gray-500">
        Perbarui informasi penugasan distributor agar pelaksanaan kampanye tetap
        berjalan jelas, terstruktur, dan sesuai kebutuhan.
      </p>
      <Line />
      <AssignmentDetailProvider initialAssignment={initialAssignment}>
        <EditDistributorAssignmentForm />
      </AssignmentDetailProvider>
    </main>
  );
};
