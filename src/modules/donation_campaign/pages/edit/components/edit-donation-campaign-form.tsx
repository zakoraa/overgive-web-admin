"use client";

import { useEffect, useState } from "react";
import { AppButton } from "@/core/components/ui/button/app-button";
import { AppDatePicker } from "@/core/components/ui/input/app-date-picker";
import { AppSelect } from "@/core/components/ui/input/app-dropdown";
import { AppInput } from "@/core/components/ui/input/app-input";
import { AppRichTextEditor } from "@/core/components/ui/input/app-rich-text-editor";
import { ModalConfirm } from "@/core/components/ui/modal/modal-confirm";
import { AppFileInput } from "@/core/components/ui/input/app-file-input";
import { useRouter } from "next/navigation";
import { ModalInfo } from "@/core/components/ui/modal/modal-info";
import { parseCurrency } from "@/core/utils/currency";
import { ModalLoading } from "@/core/components/ui/modal/modal-loading";
import { useEditCampaignFormValidation } from "@/modules/donation_campaign/pages/edit/hooks/use-edit-campaign-form-validation";
import { useEditCampaign } from "@/modules/donation_campaign/pages/edit/hooks/use-edit-campaign";
import CircularLoading from "@/core/components/ui/circular-loading";
import { useQueryClient } from "@tanstack/react-query";
import { useCampaignDetailContext } from "../../detail/providers/campaign-detail-provider";

export const EditDonationCampaignForm = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<any>({ category: "education" });
  const { errors, validate } = useEditCampaignFormValidation();
  const queryClient = useQueryClient();

  const { campaign } = useCampaignDetailContext();

  useEffect(() => {
    // console.log("Campaign: ", campaign);
    if (!campaign) return;

    setFormData({
      name: campaign.title,
      background_html: campaign.background_html,
      category: campaign.category,
      status: campaign.status,
      target_amount: campaign.target_amount
        ? String(campaign.target_amount)
        : "",
      ended_at: campaign.ended_at ? new Date(campaign.ended_at) : null,
      image_url: campaign.image_url ?? "",
    });
  }, [campaign]);

  if (!campaign) return <CircularLoading />;
  const { editCampaign, loading } = useEditCampaign(campaign.id);

  const [modalInfoOpen, setModalInfoOpen] = useState(false);
  const [modalInfoData, setModalInfoData] = useState({
    title: "",
    message: "",
    imageUrl: "",
  });

  const handleSubmitConfirm = async () => {
    setIsModalOpen(false);

    const rawTarget = parseCurrency(formData.target_amount);
    const targetAmount = rawTarget === 0 ? null : rawTarget;

    let image_file_base64: string | undefined;
    if (formData.image_file) {
      const reader = new FileReader();
      reader.readAsDataURL(formData.image_file);
      image_file_base64 = await new Promise((resolve) => {
        reader.onload = () => resolve(reader.result as string);
      });
    }
    console.log("ENDET AT: ", formData.ended_at);
    const payload = {
      name: formData.name,
      background_html: formData.background_html,
      category: formData.category,
      status: formData.status,
      target_amount: targetAmount,
      ended_at: formData.ended_at ? formData.ended_at.toISOString() : null,
      image_file_base64,
    };

    const result = await editCampaign(payload);

    if (result?.success) {
      setModalInfoData({
        title: "Berhasil!",
        message: "Kampanye berhasil diperbarui.",
        imageUrl: "/svgs/success.svg",
      });
      setModalInfoOpen(true);
    } else {
      // console.log("ERROR  EDIT:", result?.error);
      setModalInfoData({
        title: "Gagal!",
        message: result?.error || "Terjadi kesalahan",
        imageUrl: "/svgs/failed.svg",
      });
      setModalInfoOpen(true);
    }
  };

  const handleCloseInfoModal = () => {
    setModalInfoOpen(false);

    // Kalau sukses → redirect
    if (modalInfoData.title === "Berhasil!") {
      queryClient.invalidateQueries({
        queryKey: ["campaign-details", campaign.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["campaign", campaign.id],
      });
      router.replace("/?tab=campaign");
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
            label="Thumbnail"
            name="image_file"
            accept="image/*"
            error={errors.image_file}
            initialUrl={campaign?.image_url ?? null}
            onChange={(file) => setFormData({ ...formData, image_file: file })}
            hint="Upload thumbnail kampanye"
          />

          <AppInput
            name="name"
            required
            label="Nama"
            error={errors.name}
            value={formData.name || ""}
            hint="Masukkan nama kampanye"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <AppSelect
            required
            label="Kategori"
            name="category"
            error={errors.category}
            defaultValue={formData.category}
            onChange={(val) => setFormData({ ...formData, category: val })}
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
          />
          <AppSelect
            required
            label="Status"
            name="status"
            error={errors.status}
            defaultValue={formData.status}
            onChange={(val) => setFormData({ ...formData, status: val })}
            options={[
              { label: "Aktif", value: "active" },
              { label: "Tidak Aktif", value: "inactive" },
            ]}
          />

          <AppInput
            name="target_amount"
            allowedChar="currency"
            label="Target Donasi (Rp) (Opsional)"
            labelMessage={"Kosongkan jika tidak ada."}
            hint="cth: 100.000.000"
            error={errors.category}
            value={formData.target_amount || ""}
            onChange={(e) =>
              setFormData({ ...formData, target_amount: e.target.value })
            }
          />

          <AppDatePicker
            label="Tanggal Berakhir (Opsional)"
            labelMessage={"Kosongkan jika tidak ada."}
            name="ended_at"
            defaultValue={formData.ended_at}
            onChange={(val) => setFormData({ ...formData, ended_at: val })}
          />
        </div>

        <AppRichTextEditor
          label="Latar Belakang Kampanye"
          name="background"
          placeholder="Tulis latar belakang kampanye..."
          error={errors.background_html}
          required
          defaultValue={formData.background_html}
          onChange={(val) => setFormData({ ...formData, background_html: val })}
        />

        <AppButton
          type="submit"
          text={loading ? "Menyimpan..." : "Edit Kampanye Donasi"}
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
        description="Apakah kamu yakin ingin memperbarui kampanye donasi ini?"
        confirmText="Ya, Perbarui"
        cancelText="Batal"
      />
    </>
  );
};
