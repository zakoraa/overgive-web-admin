import { AppButtonSm } from "@/core/components/ui/button/app-button-sm";
import {
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from "@/core/components/ui/table/table";
import { Edit, Trash2 } from "lucide-react";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { ModalConfirm } from "@/core/components/ui/modal/modal-confirm";
import { formatDate } from "@/core/utils/date";

import CircularLoading from "@/core/components/ui/circular-loading";
import { ModalInfo } from "@/core/components/ui/modal/modal-info";
import { ModalLoading } from "@/core/components/ui/modal/modal-loading";
import { User } from "@/core/types/user";
import { useUserContext } from "@/core/providers/get-user-provider";
import { useDeleteUser } from "@/core/hooks/use-delete-user";

export const DistributorTable = () => {
  const router = useRouter();
  const { users, isLoading } = useUserContext();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedDistributor, setSelectedDistributor] = useState<User | null>(
    null,
  );
  const { remove, loading: deleting } = useDeleteUser();

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
    if (!selectedDistributor) return;

    const result = await remove(selectedDistributor.id);

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
      message: `Penugasan distributor untuk <b>${selectedDistributor.email}</b> berhasil dihapus.`,
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
      {users.length === 0 ? (
        <p className="text-xs text-gray-500">Belum ada data penugasan</p>
      ) : (
        <>
          <Table className="min-w-full">
            <TableHeader className="bg-gray-50 text-left text-xs font-semibold text-gray-600">
              <TableRow>
                <TableCell isHeader>No</TableCell>
                <TableCell isHeader>Nama</TableCell>
                <TableCell isHeader>Email</TableCell>
                <TableCell isHeader>Tgl Dibuat</TableCell>
                <TableCell isHeader>Aksi</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user.id} className="hover:bg-gray-50">
                  <TableCell className="text-sm">{index + 1}</TableCell>
                  <TableCell className="text-sm font-semibold">
                    {user.name}
                  </TableCell>
                  <TableCell className="text-sm">{user.email}</TableCell>

                  <TableCell className="text-sm">
                    {formatDate(user.created_at)}
                  </TableCell>

                  <TableCell className="users-center flex space-x-1">
                    <AppButtonSm
                      icon={<Edit />}
                      className="bg-secondary!"
                      onClick={() => router.push(`/assignment/edit/${user.id}`)}
                    />

                    <AppButtonSm
                      icon={<Trash2 />}
                      className="bg-error!"
                      onClick={() => {
                        setSelectedDistributor(user);
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
