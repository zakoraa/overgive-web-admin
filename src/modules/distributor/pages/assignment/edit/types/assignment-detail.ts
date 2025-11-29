export interface AssignmentDetailRaw {
  id: string;
  distributor_id: string;
  campaign_id: string;
  notes: string | null;
  distributor: { id: string; name: string } | null;
  campaign: { id: string; title: string; category: string } | null;
}

export type AssignmentDetail = {
  id: string;
  distributor_id: string;
  campaign_id: string;
  notes: string;
  distributor_name: string;
  campaign_title: string;
  campaign_category: string;
};
