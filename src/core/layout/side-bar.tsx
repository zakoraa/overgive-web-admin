import { useState } from "react";
import { TabItem, tabs } from "./tabs";
import { Menu, ChevronsLeft, ChevronsRight } from "lucide-react";
import AppLogo from "@/core/components/ui/app-logo";

type SideBarProps = {
  activeTab: string;
  setActiveTab: (id: string) => void;
};

export default function SideBar({ activeTab, setActiveTab }: SideBarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="z-50 bg-white">
      {/* Burger Button (Mobile Only) */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="absolute top-4 right-4 z-50 rounded-md bg-white p-2 shadow-md lg:hidden"
      >
        <Menu className="h-6 w-6 text-gray-700" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen transform bg-white px-3 text-gray-700 shadow-xl transition-all duration-300 ${isMobileOpen ? "w-72 translate-x-0" : "w-72 -translate-x-full"} lg:relative lg:translate-x-0 ${isCollapsed ? "lg:w-24" : "lg:w-72"} `}
      >
        {/* Logo + Collapse Button */}
        <div className="my-3 flex items-center justify-between">
          <div className="hidden lg:block"></div>
          {!isCollapsed ? (
            <AppLogo height={150} width={150} />
          ) : (
            <AppLogo isFullLogo={false} height={30} width={30} />
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden cursor-pointer rounded-md p-2 hover:bg-gray-100 lg:flex"
          >
            {isCollapsed ? (
              <ChevronsRight className="h-5 w-5" />
            ) : (
              <ChevronsLeft className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {tabs.map((tab: TabItem) => (
            <div
              key={tab.id}
              className={`${tab.id === "logout" ? "text-red-500" : ""}`}
            >
              {/* Garis sebelum Logout */}
              {tab.id === "logout" && <hr className="my-2 border-gray-300" />}
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`flex w-full cursor-pointer items-center gap-3 rounded-lg p-3 text-left transition ${
                  activeTab === tab.id
                    ? `text-primary-dark bg-primary-faded font-semibold`
                    : "hover:bg-gray-100"
                }`}
              >
                {tab.icon}
                {/* Label sembunyikan kalau collapsed */}
                {!isCollapsed && <span>{tab.label}</span>}
              </button>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
