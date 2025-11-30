// app/distributor/assignment/edit/[id]/page.tsx

import { EditDistributorAssignment } from "@/modules/distributor_assignment/edit";
import { getAssignmentDetail } from "@/modules/distributor_assignment/edit/services/get-assignment-detail";
import { notFound } from "next/navigation";

interface DistributorAssignmentPageProps {
  params: { id: string };
}

export default async function Page({ params }: DistributorAssignmentPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const distributorAssignment = await getAssignmentDetail(id);

  if (!distributorAssignment) return notFound();

  return (
    <EditDistributorAssignment initialAssignment={distributorAssignment} />
  );
}
