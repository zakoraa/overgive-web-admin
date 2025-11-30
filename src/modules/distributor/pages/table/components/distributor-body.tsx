"use client";

import { PaginationButton } from "@/core/components/ui/table/pagination-button";
import SearchInput from "@/core/components/ui/search/search-input";
import { AppButtonSm } from "@/core/components/ui/button/app-button-sm";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUserContext } from "@/core/providers/get-user-provider";
import { DistributorTable } from "./distributor-table";

export default function DistributorBody() {
  const router = useRouter();
  const { page, setPage, totalPages } = useUserContext();

  return (
    <section className="container space-y-4 overflow-x-scroll rounded-xl border border-gray-300 bg-white py-5 sm:overflow-x-hidden">
      <div className="mx-3 flex items-center justify-between gap-10">
        <SearchInput placeholder="Cari nama kampanye..." />
        <AppButtonSm
          onClick={() => router.push("/distributor/create")}
          text="Tambah"
          icon={<Plus />}
        />
      </div>

      <DistributorTable />
      {totalPages !== 0 && (
        <PaginationButton
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}
    </section>
  );
}
