"use client";

import { useState } from "react";
import SideBar from "./side-bar";
import { Modal } from "@/core/components/ui/modal/modal";
import DonationCampaign from "@/modules/donation_campaign/pages/table";
import { useRouter, useSearchParams } from "next/navigation";
import { useLogout } from "@/modules/auth/hooks/use-logout";
import { ModalLoading } from "@/core/components/ui/modal/modal-loading";
import { ModalInfo } from "@/core/components/ui/modal/modal-info";
import CreateDistributor from "@/modules/distributor/pages/create";
import AssignDistributor from "@/modules/distributor/pages/assignment/table";

export default function AppLayout() {
  const [modalInfoOpen, setModalInfoOpen] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const tab = searchParams.get("tab") || "campaign";

  const handleChangeTab = (tabName: string) => {
    router.push(`/?tab=${tabName}`);
  };

  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, _] = useState(false);
  const { logout, loading } = useLogout();

  const handleLogoutCancel = () => setShowLogoutModal(false);

  const handleLogoutConfirm = async () => {
    setShowLogoutModal(false);

    try {
      await logout();
      router.refresh();
    } catch {
      setModalInfoOpen(true);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideBar
        activeTab={tab}
        setActiveTab={(name) => {
          if (name === "logout") return setShowLogoutModal(true);
          handleChangeTab(name);
        }}
      />

      {/* Konten Dinamis */}
      <div className="flex-1 overflow-auto p-6">
        {/* {activeTab === "dashboard" && <Dashboard />} */}
        {tab === "campaign" && <DonationCampaign />}
        {tab === "assign-distributor" && <AssignDistributor />}
        {tab === "create-distributor" && <CreateDistributor />}
      </div>

      {/* Modal Logout */}
      <Modal isOpen={showLogoutModal} onClose={handleLogoutCancel}>
        <div className="text-center">
          <h3 className="text-lg font-semibold">Konfirmasi Logout</h3>
          <p className="mt-2 text-sm text-gray-600">
            Apakah Anda yakin ingin keluar?
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={handleLogoutCancel}
              className="cursor-pointer rounded-lg bg-gray-300 px-4 py-2 text-black"
            >
              Batal
            </button>
            <button
              onClick={handleLogoutConfirm}
              className="cursor-pointer rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
              disabled={isLoggingOut}
            >
              {isLoggingOut ? "Logging out..." : "Keluar"}
            </button>
          </div>
        </div>
      </Modal>

      <ModalInfo
        isOpen={modalInfoOpen}
        onClose={() => setModalInfoOpen(false)}
        title={"Gagal!"}
        message={"Gagal logout. Silakan coba lagi!"}
      />

      <ModalLoading isOpen={loading} />
    </div>
  );
}
