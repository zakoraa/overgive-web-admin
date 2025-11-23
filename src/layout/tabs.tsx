import { ReactNode } from "react";
import {
  LayoutDashboard,
  UserPlus,
  LogOut,
  History,
} from "lucide-react";

export type TabItem = {
  id: string;
  label: string;
  icon: ReactNode;
};

export const tabs: TabItem[] = [
  {
    id: "dashboard",
    label: "Dasbor",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    id: "history",
    label: "Riwayat Pemeriksaan",
    icon: <History className="w-5 h-5" />,
  },
  // {
  //   id: "patients",
  //   label: "Tabel Pasien",
  //   icon: <Table className="w-5 h-5" />,
  // },
  {
    id: "doctors",
    label: "Daftarkan Dokter",
    icon: <UserPlus className="w-5 h-5" />,
  },
  {
    id: "logout",
    label: "Logout",
    icon: <LogOut className="w-5 h-5 text-red-500" />,
  },
];
