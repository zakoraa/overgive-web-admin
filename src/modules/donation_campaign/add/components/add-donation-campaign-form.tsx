"use client";

import { useState } from "react";

import { AppButton } from "@/components/ui/button/app-button";
import { AppDatePicker } from "@/components/ui/input/app-date-picker";
import { AppSelect } from "@/components/ui/input/app-dropdown";
import { AppInput } from "@/components/ui/input/app-input";
import { AppRichTextEditor } from "@/components/ui/input/app-rich-text-editor";
import { ModalConfirm } from "@/components/ui/modal/modal-confirm";


export const AddDonationCampaignForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmitConfirm = () => {
    setIsModalOpen(false);

    // Tempat submit form beneran
    console.log("Submit kampanye donasi...");
  };

  return (
    <>
      <form
        className="space-y-3 pb-14"
        onSubmit={(e) => {
          e.preventDefault();
          setIsModalOpen(true);
        }}
      >
        <div className="space-y-3 lg:w-[40%]!">
          <AppInput
            name="name"
            required
            label="Nama"
            hint={"Masukkan nama kampanye"}
          />

          <AppSelect
            required
            label="Kategori"
            name="category"
            options={[
              { label: "Pendidikan", value: "edu" },
              { label: "Lingkungan", value: "d" },
              { label: "Bencana Alam", value: "s" },
              { label: "Kesehatan", value: "health" },
              { label: "Panti Asuhan", value: "e" },
              { label: "Rumah Ibadah", value: "k" },
              { label: "Difabel", value: "t" },
              { label: "Lainnya", value: "humanity" },
            ]}
          />

          <AppInput
            required
            name="target_ammount"
            allowedChar="currency"
            label="Target Donasi (Rp)"
            hint={"cth: 100.000.000"}
          />

          <AppDatePicker label="Tanggal Berakhir (Opsional)" name="ended_at" />
        </div>

        <AppRichTextEditor
          label="Latar Belakang Kampanye"
          name="background"
          placeholder="Tulis latar belakang kampanye secara lengkap..."
          required
        />

        {/* Tombol submit → hanya membuka modal */}
        <AppButton
          type="submit"
          text="Tambah Kampanye Donasi"
          className="mt-10 w-full! rounded-xl!"
        />
      </form>

      {/* Modal Konfirmasi */}
      <ModalConfirm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleSubmitConfirm}
        title="Konfirmasi Tambah Kampanye"
        description="Apakah kamu yakin ingin menambahkan kampanye donasi baru?"
        confirmText="Ya, Tambahkan"
        cancelText="Batal"
      />
    </>
  );
};
