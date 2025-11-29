import { Title } from "@/components/text/title";
import BasePage from "@/layout/base-page";
import AssignDistributorBody from "./components/assign-distributor-body";

export default function AssignDistributor() {
  return (
    <BasePage>
      {/* Header  */}
      <Title size="lg" text="Tugaskan Distributor" />

      {/* Body */}
      <AssignDistributorBody />
    </BasePage>
  );
}
