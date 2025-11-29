import { Title } from "@/core/components/text/title";
import BasePage from "@/core/layout/base-page";
import AssignDistributorBody from "./components/assign-distributor-body";
import { AssignmentProvider } from "./providers/assignment-table-provider";

export default function AssignDistributor() {
  return (
    <BasePage>
      {/* Header  */}
      <Title size="lg" text="Penugasan Distributor" />

      {/* Body */}
      <AssignmentProvider>
        <AssignDistributorBody />
      </AssignmentProvider>
    </BasePage>
  );
}
