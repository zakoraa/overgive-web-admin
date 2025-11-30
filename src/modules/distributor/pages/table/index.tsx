import { Title } from "@/core/components/text/title";
import BasePage from "@/core/layout/base-page";
import DistributorBody from "./components/distributor-body";
import { GetUserProvider } from "@/core/providers/get-user-provider";

export default function Distributor() {
  return (
    <BasePage>
      {/* Header  */}
      <Title size="lg" text="Distributor" />

      {/* Body */}
      <GetUserProvider>
        <DistributorBody />
      </GetUserProvider>
    </BasePage>
  );
}
