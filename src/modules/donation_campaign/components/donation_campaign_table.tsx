import { AppButtonSm } from "@/components/ui/button/app-button-sm";
import { Modal } from "@/components/ui/modal/modal";
import {
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table/table";
import { Edit, Eye, Trash2 } from "lucide-react";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { ModalConfirm } from "@/components/ui/modal/modal-confirm";

export const DonationCampaignTable = () => {
  const router = useRouter();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  //   const { users, sort, setSort } = useHistoryContext();

  const toggleSort = () => {
    // setSort(sort === "asc" ? "desc" : "asc");
  };

  return (
    <div className="w-full overflow-x-auto">
      {/* {users.length === 0 ? (
        <p className="text-xs text-gray-500">Belum ada data pasien</p>
      ) : ( */}
      <Table className="min-w-full">
        <TableHeader className="bg-gray-50 text-left text-xs font-semibold text-gray-600">
          <TableRow>
            <TableCell isHeader>No</TableCell>
            <TableCell isHeader>Nama</TableCell>
            <TableCell isHeader>
              <button
                onClick={toggleSort}
                className="flex cursor-pointer items-center gap-1"
              >
                Tgl Dibuat
                {/* <span className="text-xs"> {sort === "asc" ? "▲" : "▼"}</span> */}
              </button>
            </TableCell>
            <TableCell isHeader>Dana Terkumpul (Rp)</TableCell>
            <TableCell isHeader>Target Dana (Rp)</TableCell>
            <TableCell isHeader>Status</TableCell>
            <TableCell isHeader className="flex justify-center">
              Aksi
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            // key={user.id}
            className="transition hover:bg-gray-50"
          >
            <TableCell className="text-sm text-gray-800">
              {/* {index + 1} */}1
            </TableCell>
            <TableCell className="text-sm font-bold text-gray-800">
              Bangun Sekolah di Papua
            </TableCell>
            <TableCell className="text-sm text-gray-800">
              2 November 2025
            </TableCell>
            <TableCell className="text-sm text-gray-800">12.000.000</TableCell>
            <TableCell className="text-sm text-gray-800">100.000.000</TableCell>
            <TableCell className="bg-primary-faded text-primary-dark px-4 py-2 text-sm">
              Berlangsung
            </TableCell>

            <TableCell className="flex items-center justify-center space-x-1 text-center">
              <AppButtonSm
                icon={<Eye />}
                //   onClick={() => router.push(`/history/${user.id}`)}
              />
              <AppButtonSm
                icon={<Edit />}
                className="bg-secondary!"
                //   onClick={() => router.push(`/history/${user.id}`)}
              />
              <AppButtonSm
                icon={<Trash2 />}
                onClick={() => {
                  setSelectedId("1"); // nanti diganti id asli
                  setOpenDeleteModal(true);
                }}
                className="bg-error!"
                //   onClick={() => router.push(`/history/${user.id}`)}
              />
            </TableCell>
          </TableRow>
          {/* })} */}
        </TableBody>
      </Table>
      <ModalConfirm
        isOpen={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        onConfirm={() => {
          console.log("hapus data!");
          setOpenDeleteModal(false);
        }}
        title="Hapus Kampanye?"
        description="Apakah kamu yakin ingin menghapus kampanye ini? Tindakan ini tidak dapat dibatalkan."
        confirmText="Hapus"
        cancelText="Batal"
        confirmClassName="bg-error!"
        cancelClassName=" bg-primary!"
      />

      {/* )} */}
    </div>
  );
};
