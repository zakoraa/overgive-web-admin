import { CampaignOperationalCost } from "./campaign-operational-cost";

export interface DonationSettlementSummary {
  campaign_id: string;
  campaign_title: string;
  total_gross: number;
  total_gas_fee: number;
  total_xendit_fee: number;
  total_fee: number;
  total_net: number;
  operational_fees: CampaignOperationalCost[];
  total_operational: number;
  final_net: number;
  currency: string;
}

