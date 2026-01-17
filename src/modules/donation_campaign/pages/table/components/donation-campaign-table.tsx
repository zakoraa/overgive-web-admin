import { AppButtonSm } from "@/core/components/ui/button/app-button-sm";
import {
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@/core/components/ui/table/table";
import { Edit, Eye, Trash2 } from "lucide-react";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { ModalConfirm } from "@/core/components/ui/modal/modal-confirm";
import { formatRupiah } from "@/core/utils/currency";
import { formatDate } from "@/core/utils/date";
import { CampaignCategory } from "@/modules/donation_campaign/types/campaign";
import {
  categoryDisplay,
  getCampaignStatusInfo,
} from "@/modules/donation_campaign/utils/campaign-display";
import CircularLoading from "@/core/components/ui/circular-loading";
import { useCampaignContext } from "@/modules/donation_campaign/pages/table/providers/campaign-table-provider";
import { useDeleteCampaign } from "@/modules/donation_campaign/pages/table/hooks/use-delete-campaign";
import { ModalInfo } from "@/core/components/ui/modal/modal-info";
import { ModalLoading } from "@/core/components/ui/modal/modal-loading";
import { CampaignTableItem } from "../types/campaign-table";

export const DonationCampaignTable = () => {
  const router = useRouter();
  const { campaigns, isLoading } = useCampaignContext();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedCampaign, setSelectedCampaign] =
    useState<CampaignTableItem | null>(null);
  const { deleteCampaign, loading: deleting } = useDeleteCampaign();

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
    if (!selectedCampaign) return;

    // tampilkan loading otomatis lewat hook useDeleteCampaign
    const result = await deleteCampaign(selectedCampaign.id);

    // tutup modal konfirmasi
    setOpenDeleteModal(false);

    // tampilkan modal info sukses/gagal
    if (result.success) {
      setModalInfoData({
        title: "Berhasil!",
        message: `Kampanye <b>${selectedCampaign.title}</b> berhasil dihapus.`,
        imageUrl: "/svgs/success.svg",
      });
      setModalInfoOpen(true);
    } else {
      setModalInfoData({
        title: "Gagal!",
        message: `Terjadi kesalahan: ${result.message}`,
        imageUrl: "/svgs/failed.svg",
      });
      setModalInfoOpen(true);
    }
  };

  if (isLoading) return <CircularLoading />;

  //   const { users, sort, setSort } = useHistoryContext();

  const toggleSort = () => {
    // setSort(sort === "asc" ? "desc" : "asc");
  };

  return (
    <div className="w-full overflow-x-auto">
      {campaigns.length === 0 ? (
        <p className="text-xs text-gray-500">Belum ada data</p>
      ) : (
        <>
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
                <TableCell isHeader>Kategori</TableCell>
                <TableCell isHeader>Dana Terkumpul (Rp)</TableCell>
                <TableCell isHeader>Target Dana (Rp)</TableCell>
                <TableCell isHeader>Status</TableCell>
                <TableCell isHeader>Aksi</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns?.map((campaign, index) => (
                <TableRow
                  key={campaign.id}
                  className="transition hover:bg-gray-50"
                >
                  <TableCell className="text-sm text-gray-800">
                    {index + 1}
                  </TableCell>
                  <TableCell className="text-sm font-bold text-gray-800">
                    {campaign.title}
                  </TableCell>
                  <TableCell className="text-sm text-gray-800">
                    {formatDate(campaign.created_at)}
                  </TableCell>
                  <TableCell className="text-sm text-gray-800">
                    {categoryDisplay[campaign.category as CampaignCategory]}
                  </TableCell>
                  <TableCell>
                    {formatRupiah(campaign.collected_amount, false)}
                  </TableCell>
                  <TableCell>
                    {campaign.target_amount === null
                      ? "-"
                      : formatRupiah(campaign.target_amount, false)}
                  </TableCell>
                  <TableCell
                    className={`px-4 py-2 text-sm ${
                      getCampaignStatusInfo(campaign.status, campaign.ended_at)
                        .colorClass
                    }`}
                  >
                    {
                      getCampaignStatusInfo(campaign.status, campaign.ended_at)
                        .label
                    }
                  </TableCell>

                  <TableCell className="flex items-center justify-center space-x-1 text-center">
                    <AppButtonSm
                      icon={<Eye />}
                      onClick={() => router.push(`/campaign/${campaign.id}`)} // navigasi ke halaman detail
                    />

                    <AppButtonSm
                      icon={<Edit />}
                      className="bg-secondary!"
                      onClick={() =>
                        router.push(`/campaign/edit/${campaign.id}`)
                      }
                    />
                    <AppButtonSm
                      icon={<Trash2 />}
                      onClick={() => {
                        setSelectedCampaign(campaign);
                        setOpenDeleteModal(true);
                      }}
                      className="bg-error!"
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
            title="Hapus Kampanye?"
            description={`Apakah kamu yakin ingin menghapus <b>${selectedCampaign?.title}</b>? Tindakan ini tidak dapat dibatalkan.`}
            confirmText="Hapus"
            cancelText="Batal"
            confirmClassName="bg-error!"
            cancelClassName=" bg-primary!"
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
