import { AppButtonSm } from "@/core/components/ui/button/app-button-sm";
import {
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@/core/components/ui/table/table";
import { Edit, Edit2, Eye, Trash2 } from "lucide-react";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { ModalConfirm } from "@/core/components/ui/modal/modal-confirm";
import { formatDate } from "@/core/utils/date";

import CircularLoading from "@/core/components/ui/circular-loading";
import { ModalInfo } from "@/core/components/ui/modal/modal-info";
import { ModalLoading } from "@/core/components/ui/modal/modal-loading";
import { DistributorAssignmentItem } from "../types/distributor-assignment";
import { useAssignmentContext } from "../providers/assignment-table-provider";
import { CampaignCategory } from "@/modules/donation_campaign/types/campaign";
import { categoryDisplay } from "@/modules/donation_campaign/utils/campaign-display";
import { useDeleteDistributorAssignment } from "../hooks/use-delete-distributor-assignment";

export const AssignDistributorTable = () => {
  const router = useRouter();
  const { assignments, isLoading } = useAssignmentContext();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] =
    useState<DistributorAssignmentItem | null>(null);
  const {
    remove,
    loading: deleting,
    error: deleteError,
  } = useDeleteDistributorAssignment();

  const [modalInfoOpen, setModalInfoOpen] = useState(false);
  const [modalInfoData, setModalInfoData] = useState({
    title: "",
    message: "",
    imageUrl: "",
  });

  const handleCloseInfoModal = () => {
    setModalInfoOpen(false);
    if (modalInfoData.title === "Berhasil!") {
      window.location.reload();
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedAssignment) return;

    const result = await remove(selectedAssignment.id);

    setOpenDeleteModal(false);

    if (result.error) {
      setModalInfoData({
        title: "Gagal!",
        message: `Terjadi kesalahan: ${result.error}`,
        imageUrl: "/svgs/failed.svg",
      });
      setModalInfoOpen(true);
      return;
    }

    setModalInfoData({
      title: "Berhasil!",
      message: `Penugasan distributor untuk <b>${selectedAssignment.distributor_email}</b> berhasil dihapus.`,
      imageUrl: "/svgs/success.svg",
    });
    setModalInfoOpen(true);
  };

  if (isLoading) return <CircularLoading />;

  //   const { users, sort, setSort } = useHistoryContext();

  const toggleSort = () => {
    // setSort(sort === "asc" ? "desc" : "asc");
  };

  return (
    <div className="w-full overflow-x-auto">
      {assignments.length === 0 ? (
        <p className="text-xs text-gray-500">Belum ada data penugasan</p>
      ) : (
        <>
          <Table className="min-w-full">
            <TableHeader className="bg-gray-50 text-left text-xs font-semibold text-gray-600">
              <TableRow>
                <TableCell isHeader>No</TableCell>
                <TableCell isHeader>Distributor</TableCell>
                <TableCell isHeader>Kampanye</TableCell>
                <TableCell isHeader>Kategori</TableCell>
                <TableCell isHeader>Ditetapkan Oleh (Admin)</TableCell>
                <TableCell isHeader>Tgl Penugasan</TableCell>
                <TableCell isHeader>Aksi</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {assignments.map((item, index) => (
                <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableCell className="text-sm">{index + 1}</TableCell>
                  <TableCell className="text-sm font-semibold">
                    {item.distributor_email}
                  </TableCell>
                  <TableCell className="text-sm">
                    {item.campaign_title}
                  </TableCell>
                  <TableCell className="text-sm capitalize">
                    {
                      categoryDisplay[
                        item.campaign_category as CampaignCategory
                      ]
                    }
                  </TableCell>
                  <TableCell className="text-sm">
                    {item.assigned_by_email}
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatDate(item.assigned_at)}
                  </TableCell>

                  <TableCell className="flex items-center space-x-1">
                    <AppButtonSm
                      icon={<Edit />}
                      className="bg-secondary!"
                      onClick={() => router.push(`/assignment/edit/${item.id}`)}
                    />

                    <AppButtonSm
                      icon={<Trash2 />}
                      className="bg-error!"
                      onClick={() => {
                        setSelectedAssignment(item);
                        setOpenDeleteModal(true);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <ModalConfirm
            isOpen={openDeleteModal}
            onClose={() => setOpenDeleteModal(false)}
            onConfirm={handleConfirmDelete}
            title="Hapus Penugasan?"
            description="Penugasan distributor ini akan dihapus dan tindakan ini tidak dapat dibatalkan."
            confirmText="Hapus"
            cancelText="Batal"
            confirmClassName="bg-error!"
            cancelClassName="bg-primary!"
          />

          <ModalInfo
            isOpen={modalInfoOpen}
            onClose={handleCloseInfoModal}
            title={modalInfoData.title}
            message={modalInfoData.message}
            imageUrl={modalInfoData.imageUrl}
          />

          <ModalLoading isOpen={deleting} />
        </>
      )}
    </div>
  );
};
