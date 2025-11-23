"use client";

import { useState } from "react";
import SideBar from "./side-bar";
import { Modal } from "@/components/ui/modal/modal";
import DonationCampaign from "@/modules/donation_campaign";

export default function AppLayout() {
  const [activeTab, setActiveTab] = useState("kampanye");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isLoggingOut, _] = useState(false);
  // const logout = useLogout();

  const handleLogoutCancel = () => setShowLogoutModal(false);

  const handleLogoutConfirm = async () => {
    // await logout();
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideBar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === "logout") {
            setShowLogoutModal(true);
          } else {
            setActiveTab(tab);
          }
        }}
      />

      {/* Konten Dinamis */}
      <div className="flex-1 overflow-auto p-6">
        {/* {activeTab === "dashboard" && <Dashboard />} */}
        {activeTab === "kampanye" && <DonationCampaign />}
        {/* {activeTab === "doctors" && <CreateDoctorAccountForm />} */}
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
    </div>
  );
}
