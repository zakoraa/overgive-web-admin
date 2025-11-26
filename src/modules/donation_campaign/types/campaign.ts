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

