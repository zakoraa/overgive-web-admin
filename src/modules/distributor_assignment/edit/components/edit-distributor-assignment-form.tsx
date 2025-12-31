"use client";

import { useEffect, useState } from "react";
import { AppButton } from "@/core/components/ui/button/app-button";
import { AppRichTextEditor } from "@/core/components/ui/input/app-rich-text-editor";
import { ModalConfirm } from "@/core/components/ui/modal/modal-confirm";
import { ModalInfo } from "@/core/components/ui/modal/modal-info";
import { ModalLoading } from "@/core/components/ui/modal/modal-loading";
import { useRouter } from "next/navigation";
import { AppSearchSelectInfinite } from "@/core/components/ui/input/app-search-select/app-search-select";
import { GridInput } from "@/core/components/ui/input/layout/grid-input";
import { useEditAssignment } from "../hooks/use-edit-assignment";
import { AppInput } from "@/core/components/ui/input/app-input";
import { useAssignmentDetailContext } from "../providers/edit-assignment-provider";
import { useGetUsers } from "@/core/hooks/use-get-users";
import { useQueryClient } from "@tanstack/react-query";

export const EditDistributorAssignmentForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, loading, error, reload } = useAssignmentDetailContext();

  const { edit, loading: loadingEdit } = useEditAssignment(data.id);
  const {
    users,
    isLoading: distributorLoading,
    hasMore,
    loadMore,
    search,
    setSearch,
  } = useGetUsers();

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalInfoOpen, setModalInfoOpen] = useState(false);
  const [modalInfoData, setModalInfoData] = useState({
    title: "",
    message: "",
    imageUrl: "",
  });

  const [formData, setFormData] = useState<any>({
    distributor_id: "",
    campaign_id: "",
    notes: "",
  });

  useEffect(() => {
    if (!data) return;
    setFormData({
      distributor_id: data.distributor_id,
      campaign_id: data.campaign_id,
      notes: data.notes ?? "",
    });
  }, [data]);

  const handleSubmitConfirm = async () => {
    setModalOpen(false);

    const result = await edit({
      distributor_id: formData.distributor_id,
      campaign_id: formData.campaign_id,
      notes: formData.notes,
    });

    if (result.error) {
      setModalInfoData({
        title: "Gagal!",
        message: result.error,
        imageUrl: "/svgs/failed.svg",
      });
      setModalInfoOpen(true);
      return;
    }

    setModalInfoData({
      title: "Berhasil!",
      message: "Penugasan distributor berhasil diperbarui.",
      imageUrl: "/svgs/success.svg",
    });
    setModalInfoOpen(true);
  };

  const handleCloseInfoModal = () => {
    setModalInfoOpen(false);
    if (modalInfoData.title === "Berhasil!") {
      queryClient.invalidateQueries({
        queryKey: ["assignment-detail", data.id],
      });

      router.replace("/?tab=assign-distributor");
    }
  };

  if (loading || loadingEdit) return <ModalLoading isOpen={true} />;

  return (
    <>
      <ModalLoading isOpen={loading || loadingEdit} />

      <form
        className="space-y-4 pb-20"
        onSubmit={(e) => {
          e.preventDefault();
          setModalOpen(true);
        }}
      >
        <GridInput>
          <AppInput
            required
            label="Kampanye"
            value={data.campaign_title}
            disabled
            readOnly
            hint={""}
          />

          <AppSearchSelectInfinite
            required
            label="Pilih Distributor"
            value={formData.distributor_id}
            onChange={(v) => setFormData({ ...formData, distributor_id: v })}
            options={users.map((d) => ({
              label: `${d.name} (${d.email})`,
              value: d.id,
            }))}
            onSearch={setSearch}
            onLoadMore={loadMore}
            loadingMore={distributorLoading}
            hasMore={hasMore}
          />
        </GridInput>

        <AppRichTextEditor
          label="Catatan (Opsional)"
          name="notes"
          defaultValue={formData.notes}
          onChange={(val) => setFormData({ ...formData, notes: val })}
        />

        <AppButton type="submit" text="Simpan Perubahan" className="w-full!" />
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
        title="Konfirmasi Update"
        description="Apakah kamu yakin ingin memperbarui penugasan distributor?"
        confirmText="Ya, Perbarui"
        cancelText="Batal"
      />
    </>
  );
};
