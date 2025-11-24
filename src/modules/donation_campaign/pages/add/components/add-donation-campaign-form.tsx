"use client";

import { useState } from "react";
import { AppButton } from "@/components/ui/button/app-button";
import { AppDatePicker } from "@/components/ui/input/app-date-picker";
import { AppSelect } from "@/components/ui/input/app-dropdown";
import { AppInput } from "@/components/ui/input/app-input";
import { AppRichTextEditor } from "@/components/ui/input/app-rich-text-editor";
import { ModalConfirm } from "@/components/ui/modal/modal-confirm";
import { useAddCampaign } from "@/modules/donation_campaign/hooks/use-add-campaign";
import { CampaignCategory } from "@/modules/donation_campaign/types/campaign";
import { AppFileInput } from "@/components/ui/input/app-file-input";
import { useRouter } from "next/navigation";
import { useAddCampaignFormValidation } from "@/modules/donation_campaign/hooks/use-add-campaign-form-validation";
import { ModalInfo } from "@/components/ui/modal/modal-info";
import { parseCurrency } from "@/utils/currency";
import { ModalLoading } from "@/components/ui/modal/modal-loading";

export const AddDonationCampaignForm = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<any>({ category: "education" });
  const { errors, validate, clearErrors } = useAddCampaignFormValidation();
  const { addCampaign, loading } = useAddCampaign();

  const [modalInfoOpen, setModalInfoOpen] = useState(false);
  const [modalInfoData, setModalInfoData] = useState({
    title: "",
    message: "",
    imageUrl: "",
  });

  const resetForm = () => {
    setFormData({ category: "education" });
    clearErrors();
  };

  const handleSubmitConfirm = async () => {
    setIsModalOpen(false);

    try {
      // Ambil file dari formData.image_file

      const rawTarget = parseCurrency(formData.target_amount);
      const targetAmount = rawTarget === 0 ? null : rawTarget;
      await addCampaign(
        {
          title: formData.name,
          background_html: formData.background_html,
          category: formData.category as CampaignCategory,
          target_amount: targetAmount,
          ended_at: formData.ended_at || null,
          created_by: "83740ae3-fbd2-4648-93e0-cb0e62c07167",
        },
        formData.image_file, // <- optional file untuk upload
      );

      // Munculkan modal sukses
      setModalInfoData({
        title: "Berhasil!",
        message: "Kampanye berhasil ditambahkan.",
        imageUrl: "/svgs/success.svg",
      });
      setModalInfoOpen(true);

      // Reset form
      resetForm();
    } catch (err) {
      // Munculkan modal gagal
      setModalInfoData({
        title: "Gagal!",
        message: "Terjadi kesalahan, kampanye tidak dapat ditambahkan.",
        imageUrl: "/svgs/failed.svg",
      });
      setModalInfoOpen(true);
    }
  };

  const handleCloseInfoModal = () => {
    setModalInfoOpen(false);

    // Kalau sukses → redirect
    if (modalInfoData.title === "Berhasil!") {
      router.push("/?tab=kampanye");
    }
  };

  return (
    <>
      <ModalLoading isOpen={loading} />
      <form
        className="space-y-3 pb-14"
        onSubmit={(e) => {
          e.preventDefault();
          const validation = validate(formData);

          if (Object.keys(validation).length > 0) return; // stop

          setIsModalOpen(true); //
        }}
      >
        <div className="space-y-3 lg:w-[40%]!">
          <AppFileInput
            label="Thumbnail Kampanye"
            name="thumbnail"
            accept="image/*"
            error={errors.image_file}
            hint="Unggah gambar untuk kampanye"
            onChange={(file) => setFormData({ ...formData, image_file: file })}
          />

          <AppInput
            name="name"
            required
            label="Nama"
            error={errors.name}
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
            error={errors.category}
            defaultValue={"education"}
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
            label="Target Donasi (Rp) (Opsional)"
            labelMessage={"Kosongkan jika tidak ada."}
            hint="cth: 100.000.000"
            error={errors.category}
            onChange={(event) =>
              setFormData((prev: any) => ({
                ...prev,
                target_amount: event.target.value, // <-- di sini target_amount, bukan target_ammount
              }))
            }
          />

          <AppDatePicker
            label="Tanggal Berakhir (Opsional)"
            labelMessage={"Kosongkan jika tidak ada."}
            name="ended_at"
            onChange={(val) => setFormData({ ...formData, ended_at: val })}
          />
        </div>

        <AppRichTextEditor
          label="Latar Belakang Kampanye"
          name="background"
          placeholder="Tulis latar belakang kampanye..."
          error={errors.background_html}
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

      <ModalInfo
        isOpen={modalInfoOpen}
        onClose={handleCloseInfoModal}
        title={modalInfoData.title}
        message={modalInfoData.message}
        imageUrl={modalInfoData.imageUrl}
      />

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
