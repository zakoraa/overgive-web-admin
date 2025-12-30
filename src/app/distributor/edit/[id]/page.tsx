import { EditDistributor } from "@/modules/distributor/pages/edit";


interface EditDistributorPageProps {
  params: { id: string };
}

export default async function Page({ params }: EditDistributorPageProps) {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  return <EditDistributor distributorId={id} />;
}
