import { CampaignCategory } from "@/modules/donation_campaign/types/campaign";

export interface CampaignCreateInput {
  title: string;
  background_html: string;
  image_url?: string;
  category: CampaignCategory;
  target_amount?: number | null;
  ended_at?: string | null;
  created_by: string; // UUID user
}

