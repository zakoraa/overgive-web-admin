// utils/campaign-display.ts

import { CampaignCategory, CampaignStatus } from "../types/campaign";

export const categoryDisplay: Record<CampaignCategory, string> = {
  education: "Pendidikan",
  natural_disaster: "Bencana Alam",
  health: "Kesehatan",
  orphanage: "Panti Asuhan",
  worship_place: "Tempat Ibadah",
  disability: "Disabilitas",
  environment: "Lingkungan",
  others: "Lainnya",
};

export const statusDisplay: Record<CampaignStatus, string> = {
  ongoing: "Berlangsung",
  completed: "Selesai",
};
