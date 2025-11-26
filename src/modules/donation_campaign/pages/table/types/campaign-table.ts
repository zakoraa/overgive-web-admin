import { CampaignCategory, CampaignStatus } from "@/modules/donation_campaign/types/campaign";

export interface CampaignTableItem {
  id: string;
  title: string;
  category: CampaignCategory;
  created_at: string;
  collected_amount: number;
  target_amount: number;
  status: CampaignStatus;
  ended_at: string;
}

export interface PaginatedCampaigns {
  data: CampaignTableItem[];
  total: number;
}

