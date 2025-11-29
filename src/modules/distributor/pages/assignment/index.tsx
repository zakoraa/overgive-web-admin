import { Title } from "@/core/components/text/title";
import BasePage from "@/core/layout/base-page";
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
