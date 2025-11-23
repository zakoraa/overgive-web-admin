export type CampaignCategory =
  | "education"
  | "natural_disaster"
  | "health"
  | "orphanage"
  | "worship_place"
  | "disability"
  | "environment"
  | "others";

export type CampaignStatus = "ongoing" | "completed";

export interface CampaignCreateInput {
  title: string;
  background_html: string;
  image_url: string
  category: CampaignCategory;
  target_amount: number;
  ended_at?: string | null;
  created_by: string; // UUID user
}
