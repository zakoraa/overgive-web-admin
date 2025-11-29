"use client";

import { useState } from "react";
import { AppButton } from "@/core/components/ui/button/app-button";
import { AppDatePicker } from "@/core/components/ui/input/app-date-picker";
import { AppSelect } from "@/core/components/ui/input/app-dropdown";
import { AppInput } from "@/core/components/ui/input/app-input";
import { AppRichTextEditor } from "@/core/components/ui/input/app-rich-text-editor";
import { ModalConfirm } from "@/core/components/ui/modal/modal-confirm";
import { useCreateCampaign } from "@/modules/donation_campaign/pages/create/hooks/use-create-campaign";
import { CampaignCategory } from "@/modules/donation_campaign/types/campaign";
import { AppFileInput } from "@/core/components/ui/input/app-file-input";
import { useRouter } from "next/navigation";
import { useCreateCampaignFormValidation } from "@/modules/donation_campaign/pages/create/hooks/use-create-campaign-form-validation";
import { ModalInfo } from "@/core/components/ui/modal/modal-info";
import { parseCurrency } from "@/core/utils/currency";
import { ModalLoading } from "@/core/components/ui/modal/modal-loading";
import { useGetCurrentUserContext } from "@/modules/auth/hooks/use-get-current-user";
import { GridInput } from "@/core/components/ui/input/layout/grid-input";

export const CreateDonationCampaignForm = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<any>({ category: "education" });
  const { user } = useGetCurrentUserContext();
  const { errors, validate, clearErrors } = useCreateCampaignFormValidation();
  const { addCampaign, loading } = useCreateCampaign();

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
      const rawTarget = parseCurrency(formData.target_amount);
      const targetAmount = rawTarget === 0 ? null : rawTarget;
      await addCampaign(
        {
          title: formData.name,
          background_html: formData.background_html,
          category: formData.category as CampaignCategory,
          target_amount: targetAmount,
          ended_at: formData.ended_at || null,
          created_by: user.id,
        },
        formData.image_file,
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
        <GridInput>
          <AppFileInput
            label="Thumbnail Kampanye"
            name="thumbnail"
            accept="image/*"
            error={errors.image_file}
            hint="Unggah gambar untuk kampanye"
            onChange={(file) => setFormData({ ...formData, image_file: file })}
          />
          <div></div>

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
            value={formData.category}
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
        </GridInput>

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
