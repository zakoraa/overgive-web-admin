export interface CampaignSettlementTableItem {
  id: string;
  title: string;
  category: string;
  created_at: string;
}

export interface PaginatedCampaignSettlements {
  data: CampaignSettlementTableItem[];
  total: number;
}
