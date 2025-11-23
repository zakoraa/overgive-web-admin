import { ReactNode } from "react";
import {
  LayoutDashboard,
  UserPlus,
  LogOut,
  History,
  HandHeart,
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
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    id: "kampanye",
    label: "Kampanye Donasi",
    icon: <HandHeart className="h-5 w-5" />,
  },
  // {
  //   id: "patients",
  //   label: "Tabel Pasien",
  //   icon: <Table className="w-5 h-5" />,
  // },
  {
    id: "doctors",
    label: "Daftarkan Dokter",
    icon: <UserPlus className="h-5 w-5" />,
  },
  {
    id: "logout",
    label: "Logout",
    icon: <LogOut className="h-5 w-5 text-red-500" />,
  },
];
