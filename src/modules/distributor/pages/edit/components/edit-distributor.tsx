"use client";

import { useState } from "react";
import { AppButton } from "@/core/components/ui/button/app-button";
import { ModalConfirm } from "@/core/components/ui/modal/modal-confirm";
import { ModalInfo } from "@/core/components/ui/modal/modal-info";
import { ModalLoading } from "@/core/components/ui/modal/modal-loading";
import { useRouter } from "next/navigation";
import { AppInput } from "@/core/components/ui/input/app-input";
import { useDistributorByIdContext } from "@/modules/distributor/providers/distributor-by-id-provider";
import { useUpdateDistributorName } from "../hooks/use-update-distributor-name";
import { useQueryClient } from "@tanstack/react-query";

export const EditDistributorForm = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data } = useDistributorByIdContext();
  const mutation = useUpdateDistributorName();

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalInfoOpen, setModalInfoOpen] = useState(false);
  const [modalInfoData, setModalInfoData] = useState({
    title: "",
    message: "",
    imageUrl: "",
  });
  const [name, setName] = useState(data?.name ?? "");

  const handleSubmitConfirm = async () => {
    setModalOpen(false);
    mutation.mutate(
      { id: data!.id, name },
      {
        onError: (error) => {
          setModalInfoData({
            title: "Gagal!",
            message: error.message,
            imageUrl: "/svgs/failed.svg",
          });
          setModalInfoOpen(true);
        },
        onSuccess: () => {
          setModalInfoData({
            title: "Berhasil!",
            message: "Data distributor berhasil diperbarui.",
            imageUrl: "/svgs/success.svg",
          });
          setModalInfoOpen(true);
        },
      },
    );
  };

  const handleCloseInfoModal = () => {
    setModalInfoOpen(false);
    if (modalInfoData.title === "Berhasil!") {
      queryClient.invalidateQueries({ queryKey: ["distributor"] });
      router.replace("/?tab=distributor");
    }
  };

  return (
    <>
      <ModalLoading isOpen={mutation.isPending} />

      <form
        className="space-y-4 pb-20"
        onSubmit={(e) => {
          e.preventDefault();
          setModalOpen(true);
        }}
      >
        <div className="mx-auto flex flex-col items-center justify-center space-y-2 md:max-w-[40%]">
          <AppInput
            required
            label="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
            hint="Masukkan nama baru"
          />
          <AppInput
            label="Email"
            value={data?.email ?? ""}
            disabled
            readOnly
            hint=""
          />
          <AppButton
            type="submit"
            text="Simpan Perubahan"
            className="mt-5 w-full!"
          />
        </div>
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
        description="Apakah kamu yakin ingin memperbarui data distributor ini?"
        confirmText="Ya, Perbarui"
        cancelText="Batal"
      />
    </>
  );
};
