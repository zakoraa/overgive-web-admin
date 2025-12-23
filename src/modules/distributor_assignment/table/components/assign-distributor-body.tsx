"use client";

import { PaginationButton } from "@/core/components/ui/table/pagination-button";
import { AssignDistributorTable } from "./assign-distributor-table";
import SearchInput from "@/core/components/ui/search/search-input";
import { AppButtonSm } from "@/core/components/ui/button/app-button-sm";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAssignmentContext } from "../providers/assignment-table-provider";

export default function AssignDistributorBody() {
  const router = useRouter();
  const { page, setPage, totalPages, search, setSearch } =
    useAssignmentContext();

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
        <AppButtonSm
          onClick={() => router.push("/assignment/create")}
          text="Tambah"
          icon={<Plus />}
        />
      </div>

      <AssignDistributorTable />
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
