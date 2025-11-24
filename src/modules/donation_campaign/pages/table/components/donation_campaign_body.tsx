"use client";

import CircularLoading from "@/components/ui/circular-loading";
import { PaginationButton } from "@/components/ui/table/pagination-button";
import { DonationCampaignTable } from "./donation_campaign_table";
import SearchInput from "@/components/ui/search/search-input";
import { AppButtonSm } from "@/components/ui/button/app-button-sm";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DonationCampaignBody() {
  const router = useRouter();
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

      {/* Loading Animation */}
      {/* {isLoading && <CircularLoading />} */}

      {/* {!isLoading && ( */}
      <>
        <DonationCampaignTable />
        {/* {users.length !== 0 && ( */}
        {/* <PaginationButton
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            /> */}
        {/* )} */}
      </>
      {/* )} */}
    </section>
  );
}
