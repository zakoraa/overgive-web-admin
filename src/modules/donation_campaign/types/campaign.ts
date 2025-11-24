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


export interface Campaign {
  id: string;
  title: string;
  imageUrl: string;
  backgroundHtml: string;
  category: CampaignCategory;
  targetAmount: number;
  collectedAmount: number;
  status: CampaignStatus;
  createdBy: string;
  endedAt?: string;
  createdAt: string;
  deletedAt?: string;
}

export interface CampaignTableItem {
  id: string;
  title: string;
  category: string;
  created_at: string;
  collected_amount: number;
  target_amount: number;
  status: string;
}

export interface PaginatedCampaigns {
  data: CampaignTableItem[];
  total: number;
}


export interface CampaignCreateInput {
  title: string;
  background_html: string;
  image_url?: string;
  category: CampaignCategory;
  target_amount: number;
  ended_at?: string | null;
  created_by: string; // UUID user
}
