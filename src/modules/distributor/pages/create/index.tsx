import { Title } from "@/core/components/text/title";
import BasePage from "@/core/layout/base-page";
import { CreateDistributorForm } from "./components/create-distributor-form";

export default function CreateDistributor() {
  return (
    <BasePage>
      {/* Header  */}
      <Title size="lg" text="Daftarkan Distributor Baru" />

      {/* Body */}
      <CreateDistributorForm />
    </BasePage>
  );
}
