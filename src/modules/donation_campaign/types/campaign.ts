export type CampaignCategory =
  | "education"
  | "natural_disaster"
  | "health"
  | "orphanage"
  | "worship_place"
  | "disability"
  | "environment"
  | "others";

export type CampaignStatus = "active" | "inactive";


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

export type CampaignRow = {
  id: string;
  title: string;
  image_url: string;
  background_html: string;
  category: string;
  target_amount: number;
  collected_amount: number;
  status: string;
  created_by: string;
  ended_at?: string;
  created_at: string;
  deleted_at?: string;
};


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


export interface CampaignCreateInput {
  title: string;
  background_html: string;
  image_url?: string;
  category: CampaignCategory;
  target_amount?: number | null;
  ended_at?: string | null;
  created_by: string; // UUID user
}


export interface EditCampaignPayload {
  name?: string;
  background_html?: string;
  category?: string;
  status?: string;
  target_amount?: number | null;
  ended_at?: string | null; // ISO string
  image_file_base64?: string; // optional, base64
}