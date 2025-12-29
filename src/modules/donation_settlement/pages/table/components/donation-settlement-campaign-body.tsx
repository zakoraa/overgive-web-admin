"use client";

import { PaginationButton } from "@/core/components/ui/table/pagination-button";
import { DonationSettlementCampaignTable } from "./donation-settlement-campaign-table";
import SearchInput from "@/core/components/ui/search/search-input";
import { useCampaignWithSettlementsContext } from "@/modules/donation_settlement/providers/get-campaigns-with-settlements-provider";

export default function DonationSettlementCampaignBody() {
  const { page, setPage, pageSize, data, search, setSearch } =
    useCampaignWithSettlementsContext();

  const totalPages = pageSize > 0 ? Math.ceil(data.length / pageSize) : 0;

  return (
    <section className="container space-y-4 overflow-x-scroll rounded-xl border border-gray-300 bg-white py-5 sm:overflow-x-hidden">
      <div className="mx-3 flex items-center justify-between gap-10">
        <SearchInput
          placeholder="Cari nama kampanye..."
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />
      </div>

      <DonationSettlementCampaignTable />

      {totalPages > 1 && (
        <PaginationButton
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </section>
  );
}
