"use client";

import { AppButton } from "@/core/components/ui/button/app-button";
import { Card } from "@/core/components/ui/card";
import GeneratedPasswordInformation from "@/core/components/ui/generate-password-information";
import { AppInput } from "@/core/components/ui/input/app-input";
import { ModalInfo } from "@/core/components/ui/modal/modal-info";
import { ModalLoading } from "@/core/components/ui/modal/modal-loading";
import { useState } from "react";
import { useCreateDistributorForm } from "../hooks/use-create-distributor-form";
import { useCreateDistributor } from "../hooks/use-create-distributor";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export const CreateDistributorForm = () => {
  const { form, setForm, errors, validate } = useCreateDistributorForm();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [modalInfoOpen, setModalInfoOpen] = useState(false);
  const [modalInfoData, setModalInfoData] = useState({
    title: "",
    message: "",
    imageUrl: "",
  });

  const { submit, loading, error } = useCreateDistributor();

  const handleCreateDistributor = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (!validate()) return;

    const result = await submit(form.fullName, form.email);

    if (result) {
      setModalInfoData({
        title: "Berhasil!",
        message: "Distributor berhasil didaftarkan.",
        imageUrl: "/svgs/success.svg",
      });
      setModalInfoOpen(true);
    } else {
      // console.log("LOGIN ERROR: ", error);
      setModalInfoData({
        title: "Gagal!",
        message: "Gagal mendaftarkan distributor. Silakan coba lagi!",
        imageUrl: "/svgs/failed.svg",
      });
      setModalInfoOpen(true);
    }
  };

  const handleCloseInfoModal = () => {
    setModalInfoOpen(false);
    if (modalInfoData.title === "Berhasil!") {
      queryClient.invalidateQueries({ queryKey: ["campaigns"] });
      router.replace("/?tab=distributor");
    }
  };

  return (
    <Card className="md: max-w-[700px] px-10 py-3">
      <GeneratedPasswordInformation />
      <form className="mt-5 space-y-3" onSubmit={handleCreateDistributor}>
        <AppInput
          label="Email"
          hint="contoh@gmail.com"
          value={form.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm((prev) => ({ ...prev, email: e.target.value }))
          }
          error={errors.email}
        />

        <AppInput
          label={"Nama Lengkap"}
          hint={"Masukkan nama lengkap"}
          value={form.fullName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm((prev) => ({ ...prev, fullName: e.target.value }))
          }
          error={errors.fullName}
        />

        <AppButton
          type="submit"
          width="100%"
          className="my-5"
          text="Daftarkan"
          isLoading={loading}
        />
      </form>
      <ModalInfo
        isOpen={modalInfoOpen}
        onClose={handleCloseInfoModal}
        title={modalInfoData.title}
        message={modalInfoData.message}
        imageUrl={modalInfoData.imageUrl}
      />
      <ModalLoading isOpen={loading} />
    </Card>
  );
};
