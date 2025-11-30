export interface DistributorAssignmentItem {
  id: string;
  distributor_name: string;
  distributor_email: string;
  campaign_title: string;
  campaign_category: string;
  assigned_by_name: string;
  assigned_by_email: string;
  assigned_at: string;
}

export interface DistributorAssignment {
  id: string;
  distributor_id: string;
  distributor_name: string;
  distributor_email: string;
  campaign_id: string;
  campaign_title: string;
  campaign_category: string;
  assigned_by: string;
  assigned_by_name: string;
  assigned_by_email: string;
  assigned_at: string;
}

export interface DistributorAssignmentInput {
  distributor_id: string;
  campaign_id: string;
  assigned_by: string;
}
