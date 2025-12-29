"use client";

import BasePage from "@/core/layout/base-page";
import { formatRupiah } from "@/core/utils/currency";
import { Title } from "@/core/components/text/title";
import { Line } from "@/core/components/ui/line";
import { formatDate } from "@/core/utils/date";
import { DonationSettlementSummary } from "../../types/donation-settlement";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { AddOperationalModal } from "./components/add-operational-modal";

interface DonationSettlementProps {
  summary: DonationSettlementSummary;
}

export const DonationSettlement = ({ summary }: DonationSettlementProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [operationalFees, setOperationalFees] = useState(
    summary.operational_fees,
  );

  const handleAddOperational = (amount: number, note: string) => {
    setOperationalFees([...operationalFees, { amount, note }]);
  };

  const totalOperational = operationalFees.reduce(
    (acc, cur) => acc + cur.amount,
    0,
  );
  const finalNet = summary.total_net - totalOperational;

  return (
    <BasePage className="mx-auto rounded-b-2xl p-4">
      <Title text={`Penggunaan Dana Kampanye ${summary.campaign_title}`} />
      <Line className="mt-0! mb-4" />
      <p className="w-full text-start text-sm text-gray-500">
        Terakhir update — {formatDate(summary.updated_at)}
      </p>

      <div className="mt-3 w-full overflow-hidden rounded-lg border border-gray-200 bg-white">
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
              <td className="px-4 py-2 text-left">Biaya Transaksi (Gas)</td>
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
              </td>
            </tr>

            {/* Operational Fees Detail */}
            {operationalFees.map((op, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : ""}>
                <td className="px-4 py-2 text-left">
                  • {op.note || "Biaya Operasional"}
                </td>
                <td className="px-4 py-2 text-right">
                  {formatRupiah(op.amount)}
                </td>
              </tr>
            ))}

            {/* Total Operational */}
            <tr className="bg-gray-100">
              <td className="px-4 py-2 text-left font-black">
                Total Biaya Operasional
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

      <AddOperationalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddOperational}
      />
    </BasePage>
  );
};
