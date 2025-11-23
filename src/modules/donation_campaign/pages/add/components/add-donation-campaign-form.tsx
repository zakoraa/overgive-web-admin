"use client";

import { useState } from "react";
import { AppButton } from "@/components/ui/button/app-button";
import { AppDatePicker } from "@/components/ui/input/app-date-picker";
import { AppSelect } from "@/components/ui/input/app-dropdown";
import { AppInput } from "@/components/ui/input/app-input";
import { AppRichTextEditor } from "@/components/ui/input/app-rich-text-editor";
import { ModalConfirm } from "@/components/ui/modal/modal-confirm";
import { useCampaign } from "@/modules/donation_campaign/hooks/use-campaign";
import { CampaignCategory } from "@/modules/donation_campaign/types/campaign";

export const AddDonationCampaignForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const { addCampaign, loading } = useCampaign();

  const handleSubmitConfirm = async () => {
    setIsModalOpen(false);

    try {
      const payload = {
        title: formData.name,
        background_html: formData.background_html,
        image_url: formData.image_url,
        category: formData.category as CampaignCategory,
        target_amount: Number(formData.target_ammount),
        ended_at: formData.ended_at || null,
        created_by: "ADEE KAKA",
      };

      console.log("Payload:", payload); // Hanya primitive types
      await addCampaign(payload);
      alert("Kampanye berhasil ditambahkan!");
    } catch (err) {
      console.error("Gagal kampanye:", err);
      alert("Gagal menambahkan kampanye.");
    }
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
            hint="Masukkan nama kampanye"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFormData((prev: any) => ({
                ...prev,
                name: event.target.value,
              }))
            }
          />

          <AppSelect
            required
            label="Kategori"
            name="category"
            options={[
              { label: "Pendidikan", value: "education" },
              { label: "Lingkungan", value: "environment" },
              { label: "Bencana Alam", value: "natural_disaster" },
              { label: "Kesehatan", value: "health" },
              { label: "Panti Asuhan", value: "orphanage" },
              { label: "Rumah Ibadah", value: "worship_place" },
              { label: "Difabel", value: "disability" },
              { label: "Lainnya", value: "others" },
            ]}
            onChange={(val) => setFormData({ ...formData, category: val })}
          />

          <AppInput
            name="target_amount"
            allowedChar="currency"
            label="Target Donasi (Rp)"
            hint="cth: 100.000.000"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setFormData((prev: any) => ({
                ...prev,
                target_amount: event.target.value,
              }))
            }
          />

          <AppDatePicker
            label="Tanggal Berakhir (Opsional)"
            name="ended_at"
            onChange={(val) => setFormData({ ...formData, ended_at: val })}
          />
        </div>

        <AppRichTextEditor
          label="Latar Belakang Kampanye"
          name="background"
          placeholder="Tulis latar belakang kampanye..."
          required
          onChange={(val: string) =>
            setFormData((prev: any) => ({ ...prev, background_html: val }))
          }
        />

        <AppButton
          type="submit"
          text={loading ? "Menyimpan..." : "Tambah Kampanye Donasi"}
          className="mt-5 w-full! rounded-xl!"
        />
      </form>

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
