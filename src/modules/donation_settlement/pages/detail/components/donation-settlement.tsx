"use client";

import BasePage from "@/core/layout/base-page";
import { formatRupiah } from "@/core/utils/currency";
import { Title } from "@/core/components/text/title";
import { Line } from "@/core/components/ui/line";
import { formatDate } from "@/core/utils/date";
import { Edit, Pencil, PlusIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import { ModalInfo } from "@/core/components/ui/modal/modal-info";
import { ModalLoading } from "@/core/components/ui/modal/modal-loading";
import { AppButtonSm } from "@/core/components/ui/button/app-button-sm";
import { ModalConfirm } from "@/core/components/ui/modal/modal-confirm";
import { DonationSettlementSummary } from "@/modules/donation_settlement/types/donation-settlement";
import { useCreateOperationalCost } from "@/modules/donation_settlement/hooks/use-create-operational-cost";
import { useSoftDeleteOperationalCost } from "@/modules/donation_settlement/hooks/use-delete-operational-cost";
import { useUpdateOperationalCost } from "../hooks/use-update-operational-cost";
import { OperationalModal } from "./add-operational-modal";

interface DonationSettlementProps {
  summary: DonationSettlementSummary;
}

export const DonationSettlement = ({ summary }: DonationSettlementProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [selectedOperational, setSelectedOperational] = useState<{
    id: string;
    amount: number;
    note: string | null;
  } | null>(null);

  const [infoModal, setInfoModal] = useState<{
    title: string;
    message: string;
    imageUrl: string;
  } | null>(null);
  const [operationalFees, setOperationalFees] = useState(
    summary.operational_fees,
  );
  const deleteOperationalMutation = useSoftDeleteOperationalCost();

  const totalOperational = operationalFees.reduce(
    (acc, cur) => acc + cur.amount,
    0,
  );
  const finalNet = summary.total_net - totalOperational;

  const createOperationalMutation = useCreateOperationalCost();

  const handleAddOperational = async (amount: number, note: string) => {
    setIsModalOpen(false);
    setIsLoadingModal(true);

    try {
      await createOperationalMutation.mutateAsync({
        campaignId: summary.campaign_id,
        amount,
        note,
      });

      setOperationalFees([...operationalFees, { amount, note }]);

      setInfoModal({
        title: "Sukses",
        imageUrl: "/svgs/success.svg",
        message: "Biaya operasional berhasil ditambahkan.",
      });
    } catch (err: any) {
      setInfoModal({
        title: "Gagal",
        imageUrl: "/svgs/failed.svg",
        message: err?.message || "Terjadi kesalahan",
      });
    } finally {
      setIsLoadingModal(false);
    }
  };

  const updateFee = (
    id: string,
    updated: { amount: number; note: string | null },
  ) => {
    setOperationalFees((prev) =>
      prev.map((fee) =>
        fee.id === id
          ? { ...fee, amount: updated.amount, note: updated.note }
          : fee,
      ),
    );
  };

  const updateOperationalMutation = useUpdateOperationalCost();

  const handleUpdateOperational = async (
    id: string,
    amount: number,
    note: string | null,
  ) => {
    setIsEditOpen(false);
    setIsLoadingModal(true);

    try {
      const updated = await updateOperationalMutation.mutateAsync({
        id,
        amount,
        note,
      });

      updateFee(id, {
        amount: updated.amount,
        note: updated.note,
      });

      setInfoModal({
        title: "Sukses",
        imageUrl: "/svgs/success.svg",
        message: "Biaya operasional berhasil diperbarui.",
      });
    } catch (error: any) {
      setInfoModal({
        title: "Gagal",
        imageUrl: "/svgs/failed.svg",
        message: error?.message || "Gagal memperbarui biaya operasional",
      });
    } finally {
      setIsLoadingModal(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTargetId) return;

    setIsConfirmOpen(false);
    setIsLoadingModal(true);

    try {
      await deleteOperationalMutation.mutateAsync(deleteTargetId);

      setOperationalFees((prev) =>
        prev.filter((fee) => fee.id !== deleteTargetId),
      );

      setInfoModal({
        title: "Sukses",
        imageUrl: "/svgs/success.svg",
        message: "Biaya operasional berhasil dihapus.",
      });
    } catch (err: any) {
      setInfoModal({
        title: "Gagal",
        imageUrl: "/svgs/failed.svg",
        message: err?.message || "Gagal menghapus biaya operasional",
      });
    } finally {
      setIsLoadingModal(false);
      setDeleteTargetId(null);
    }
  };

  const maxTotalFee = summary.total_gross * 0.1;

  const transactionFee = summary.total_gas_fee + summary.total_xendit_fee;

  const totalOperationalAmount = operationalFees.reduce(
    (acc, cur) => acc + cur.amount,
    0,
  );

  const totalFeeUsed = transactionFee + totalOperationalAmount;

  const remainingOperationalQuota = maxTotalFee - totalFeeUsed;

  const isOverLimit = remainingOperationalQuota < 0;

  return (
    <BasePage className="mx-auto flex flex-col items-start rounded-b-2xl p-4">
      <Title text={`Penggunaan Dana Kampanye ${summary.campaign_title}`} />
      <Line className="mt-0! mb-4" />
      <p className="w-full text-start text-sm text-gray-500">
        Terakhir update — {formatDate(summary.updated_at)}
      </p>

      <div className="flex w-fit flex-col items-start justify-start rounded-md border border-yellow-300 bg-yellow-50 p-3 text-start text-sm text-yellow-800">
        <p className="text-md font-bold">Catatan Biaya Operasional</p>

        <p className="mt-1">
          Total potongan (Biaya Operasional + Gas Fee + Biaya Admin Xendit)
          tidak boleh melebihi <span className="font-semibold">10%</span> dari
          total donasi masuk.
        </p>

        <p className="mt-2">
          Batas maksimal potongan (10% donasi):{" "}
          <span className="font-semibold">{formatRupiah(maxTotalFee)}</span>
        </p>
        <p>
          Total potongan terpakai:{" "}
          <span className="font-semibold">{formatRupiah(totalFeeUsed)}</span>
        </p>

        <p>
          Sisa maksimal biaya operasional yang dapat ditambahkan:{" "}
          <span className="font-semibold">
            {formatRupiah(Math.max(0, remainingOperationalQuota))}
          </span>
        </p>

        {isOverLimit && (
          <p className="mt-2 font-semibold text-red-600">
            ⚠ Total potongan telah melebihi batas 10% dari total donasi masuk
          </p>
        )}
      </div>
      <div className="flex w-full items-end justify-end">
        <AppButtonSm
          icon={<Edit />}
          text={isEditMode ? "Selesai Edit" : "Mode Edit"}
          onClick={() => setIsEditMode((prev) => !prev)}
          className="bg-background text-primary border-primary border px-5"
        />
      </div>
      <div className="mb-5 w-full overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="divide-y divide-gray-100">
            {/* Donation Settlement Summary */}
            <tr className="bg-gray-50">
              <td className="px-4 py-2 text-left">Total Donasi Masuk</td>
              <td className="px-4 py-2 text-right">
                {formatRupiah(summary.total_gross)}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-left">Biaya Transaksi (Gas Fee)</td>
              <td className="px-4 py-2 text-right">
                {formatRupiah(summary.total_gas_fee)}
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-4 py-2 text-left">Biaya Admin Xendit</td>
              <td className="px-4 py-2 text-right">
                {formatRupiah(summary.total_xendit_fee)}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 text-left font-black">Total Potongan</td>
              <td className="px-4 py-2 text-right font-black">
                {formatRupiah(summary.total_fee)}
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="px-4 py-2 text-left">
                Dana Donasi Bersih Sebelum Biaya Operasional
              </td>
              <td className="px-4 py-2 text-right">
                {formatRupiah(summary.total_net)}
              </td>
            </tr>

            {/* Tombol Tambah Operational */}
            <tr>
              <td colSpan={2} className="px-4 py-2 text-right">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex cursor-pointer items-center gap-2 font-medium text-blue-400"
                >
                  <PlusIcon className="h-4 w-4" /> Tambah Biaya Operasional
                </button>
                <br />
                {/* DI sini */}
              </td>
            </tr>

            {/* Operational Fees Detail */}
            {operationalFees.map((op, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
                <td className="px-4 py-2 text-left">
                  • {op.note || "Biaya Operasional"}
                </td>

                <td className="px-4 py-2 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span>{formatRupiah(op.amount)}</span>

                    {isEditMode && (
                      <>
                        <AppButtonSm
                          onClick={() => {
                            setSelectedOperational({
                              id: op.id!,
                              amount: op.amount,
                              note: op.note,
                            });
                            setIsEditOpen(true);
                          }}
                          className="bg-blue-400! p-2! hover:bg-blue-600!"
                          icon={<Pencil className="h-4 w-4" />}
                        />
                        <AppButtonSm
                          onClick={() => {
                            setDeleteTargetId(op.id!);
                            setIsConfirmOpen(true);
                          }}
                          className="bg-red-400! p-2! hover:bg-red-600!"
                          icon={<Trash2 className="h-4 w-4" />}
                        />
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}

            {/* Total Operational */}
            <tr className="bg-gray-100">
              <td className="px-4 py-2 text-left font-black">
                Total Biaya Operasional{" "}
              </td>
              <td className="px-4 py-2 text-right font-black">
                {formatRupiah(totalOperational)}
              </td>
            </tr>

            {/* Final Net */}
            <tr className="bg-gray-100">
              <td className="px-4 py-2 text-left font-black">
                Dana Bersih Tersalurkan
              </td>
              <td className="px-4 py-2 text-right font-black">
                {formatRupiah(finalNet)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <OperationalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddOperational}
        mode="add"
      />

      {selectedOperational && (
        <OperationalModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          onSubmit={(amount, note) =>
            handleUpdateOperational(selectedOperational.id, amount, note)
          }
          initialData={{
            amount: selectedOperational.amount,
            note: selectedOperational.note,
          }}
          mode="edit"
        />
      )}

      <ModalConfirm
        isOpen={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
          setDeleteTargetId(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Hapus Biaya Operasional?"
        description="Biaya operasional ini akan <b>dihapus</b> dan tidak dihitung dalam perhitungan dana."
        confirmText="Ya, Hapus"
        cancelText="Batal"
        cancelClassName="bg-primary!"
        confirmClassName="bg-red-500!"
      />

      <ModalLoading isOpen={isLoadingModal} />

      {infoModal && (
        <ModalInfo
          imageUrl={infoModal.imageUrl}
          isOpen={!!infoModal}
          onClose={() => setInfoModal(null)}
          title={infoModal.title}
          message={infoModal.message}
        />
      )}
    </BasePage>
  );
};
