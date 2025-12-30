"use client";

import { useState } from "react";
import { AppButton } from "@/core/components/ui/button/app-button";
import { AppRichTextEditor } from "@/core/components/ui/input/app-rich-text-editor";
import { ModalConfirm } from "@/core/components/ui/modal/modal-confirm";
import { ModalInfo } from "@/core/components/ui/modal/modal-info";
import { ModalLoading } from "@/core/components/ui/modal/modal-loading";
import { useRouter } from "next/navigation";
import { useCreateAssignment } from "../hooks/use-create-distributor-assignment";
import { useGetCurrentUserContext } from "@/modules/auth/hooks/use-get-current-user";
import { AppSearchSelectInfinite } from "@/core/components/ui/input/app-search-select/app-search-select";
import { useGetCampaignsAssigments } from "../hooks/use-get-campaigns-assigment";
import { CampaignCategory } from "@/modules/donation_campaign/types/campaign";
import { categoryDisplay } from "@/modules/donation_campaign/utils/campaign-display";
import { GridInput } from "@/core/components/ui/input/layout/grid-input";
import { useCreateAssignmentValidation } from "../hooks/use-create-assignment-validation";
import { useGetUsers } from "@/core/hooks/use-get-users";

export const CreateDistributorAssignmentForm = () => {
  const router = useRouter();

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalInfoOpen, setModalInfoOpen] = useState(false);
  const [modalInfoData, setModalInfoData] = useState({
    title: "",
    message: "",
    imageUrl: "",
  });

  const { createAssignment, loading } = useCreateAssignment();
  const {
    campaigns,
    loadMore: campaignLoadMore,
    hasMore: campaignHasMore,
    isLoading: campaignLoading,
    setSearch: campaignSetSearch,
  } = useGetCampaignsAssigments(20);

  const { user } = useGetCurrentUserContext();
  const {
    users,
    isLoading: distributorLoading,
    hasMore,
    loadMore,
    search,
    setSearch,
  } = useGetUsers();

  const { errors, validate } = useCreateAssignmentValidation();

  const [formData, setFormData] = useState<any>({
    distributor_id: "",
    notes: "",
  });

  const handleSubmitConfirm = async () => {
    setModalOpen(false);
    if (!user) {
      // console.error("User belum login atau belum tersedia");
      setModalInfoData({
        title: "Gagal!",
        message: "User belum tersedia, silakan login ulang.",
        imageUrl: "/svgs/failed.svg",
      });
      setModalInfoOpen(true);
      return;
    }
    try {
      await createAssignment({
        assigned_by: user.id,
        distributor_id: formData.distributor_id,
        campaign_id: formData.campaign_id,
        notes: formData.notes || null,
      });

      setModalInfoData({
        title: "Berhasil!",
        message: "Penugasan distributor berhasil ditambahkan.",
        imageUrl: "/svgs/success.svg",
      });

      setModalInfoOpen(true);

      setFormData({
        distributor_id: "",
        notes: "",
      });
    } catch (err) {
      // console.log("ERROR CREATE DISTRI: ", err);
      setModalInfoData({
        title: "Gagal!",
        message: "Terjadi kesalahan, penugasan tidak dapat ditambahkan.",
        imageUrl: "/svgs/failed.svg",
      });

      setModalInfoOpen(true);
    }
  };

  const handleCloseInfoModal = () => {
    setModalInfoOpen(false);

    if (modalInfoData.title === "Berhasil!") {
      router.push("/?tab=assign-distributor");
    }
  };

  return (
    <>
      <ModalLoading isOpen={loading} />

      <form
        className="space-y-4 pb-20"
        onSubmit={(e) => {
          e.preventDefault();
          const isValid = validate(formData);
          if (!isValid) return;

          setModalOpen(true);
        }}
      >
        <GridInput>
          <AppSearchSelectInfinite
            required
            label="Pilih Distributor"
            value={formData.distributor_id}
            placeholderSearch="Cari nama/email distributor..."
            onChange={(v) => setFormData({ ...formData, distributor_id: v })}
            onSearch={(val) => setSearch(val)}
            options={users.map((d) => ({
              label: `${d.name} (${d.email})`,
              value: d.id,
            }))}
            onLoadMore={loadMore}
            loadingMore={distributorLoading}
            hasMore={hasMore}
            error={errors.distributor_id}
          />
          <AppSearchSelectInfinite
            required
            label="Pilih Kampanye"
            value={formData.campaign_id}
            onChange={(v) => setFormData({ ...formData, campaign_id: v })}
            options={campaigns.map((c) => ({
              label: `${c.title} (${categoryDisplay[c.category as CampaignCategory]})`,
              value: c.id,
            }))}
            onLoadMore={campaignLoadMore}
            loadingMore={campaignLoading}
            hasMore={campaignHasMore}
            onSearch={campaignSetSearch}
            error={errors.campaign_id}
          />
        </GridInput>

        <AppRichTextEditor
          label="Catatan (Opsional)"
          name="notes"
          placeholder="Tambahkan catatan penugasan..."
          onChange={(val) => setFormData({ ...formData, notes: val })}
        />

        <AppButton
          type="submit"
          text="Tambah Penugasan Distributor"
          className="w-full!"
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
        onClose={() => setModalOpen(false)}
        onConfirm={handleSubmitConfirm}
        title="Konfirmasi Penugasan"
        description="Apakah kamu yakin ingin menambahkan penugasan distributor?"
        confirmText="Ya, Tambahkan"
        cancelText="Batal"
      />
    </>
  );
};
