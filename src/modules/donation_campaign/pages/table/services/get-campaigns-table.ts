"use server";

import { supabaseServer } from "@/lib/supabase/supabase-server";
import { PaginatedCampaigns, CampaignTableItem } from "../types/campaign-table";

export const getCampaignsTable = async (page: number, pageSize: number): Promise<PaginatedCampaigns> => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const supabase = await supabaseServer();
  const { data, count, error } = await supabase
    .from<"campaigns",CampaignTableItem>("campaigns")
    .select("id, title, category, created_at, collected_amount, target_amount, status, ended_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .is("deleted_at", null)
    .range(from, to);

  if (error) throw new Error(error.message);
  return { data: data || [], total: count || 0 };
};
