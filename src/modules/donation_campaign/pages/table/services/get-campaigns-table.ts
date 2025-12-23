"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { PaginatedCampaigns, CampaignTableItem } from "../types/campaign-table";

export const getCampaignsTable = async (
  page: number, 
  pageSize: number, 
  search?: string
): Promise<PaginatedCampaigns> => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const supabase = await supabaseServer();

  let query = supabase
    .from<"campaigns", CampaignTableItem>("campaigns")
    .select("id, title, category, created_at, collected_amount, target_amount, status, ended_at", { count: "exact" })
    .order("created_at", { ascending: false })
    .is("deleted_at", null)
    .range(from, to);

  if (search) {
    query = query.ilike("title", `%${search}%`);
  }

  const { data, count, error } = await query;

  if (error) throw new Error(error.message);
  return { data: data || [], total: count || 0 };
};
