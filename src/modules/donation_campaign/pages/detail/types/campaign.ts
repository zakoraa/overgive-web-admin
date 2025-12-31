import { CampaignCategory, CampaignStatus } from "@/modules/donation_campaign/types/campaign";

export interface Campaign {
  id: string;
  title: string;
  image_url: string;
  background_html: string;
  category: CampaignCategory;
  target_amount: number;
  collected_amount: number;
  status: CampaignStatus;
  created_by: string;
  ended_at?: string;
  created_at: string;
  deleted_at?: string;
}

