"use client";

import { PaginationButton } from "@/components/ui/table/pagination-button";
import { DonationCampaignTable } from "./donation-campaign-table";
import SearchInput from "@/components/ui/search/search-input";
import { AppButtonSm } from "@/components/ui/button/app-button-sm";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCampaignContext } from "@/modules/donation_campaign/providers/campaign-table-provider";

export default function DonationCampaignBody() {
  const router = useRouter();
  const { page, setPage, total, totalPages } = useCampaignContext();

  return (
    <section className="container space-y-4 overflow-x-scroll rounded-xl border border-gray-300 bg-white py-5 sm:overflow-x-hidden">
      <div className="mx-3 flex items-center justify-between gap-10">
        <SearchInput placeholder="Cari nama kampanye..." />
        <AppButtonSm
          onClick={() => router.push("/campaign/add")}
          text="Tambah"
          icon={<Plus />}
        />
      </div>

      <DonationCampaignTable />
      {total !== 0 && (
        <PaginationButton
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </section>
  );
}
