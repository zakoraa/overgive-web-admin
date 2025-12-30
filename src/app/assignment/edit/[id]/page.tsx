// app/distributor/assignment/edit/[id]/page.tsx

import { EditDistributorAssignment } from "@/modules/distributor_assignment/edit";

interface DistributorAssignmentPageProps {
  params: { id: string };
}

export default async function Page({ params }: DistributorAssignmentPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  return <EditDistributorAssignment assignmentId={id} />;
}
