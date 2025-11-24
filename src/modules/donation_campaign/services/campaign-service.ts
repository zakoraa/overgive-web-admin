import { supabaseClient } from "@/lib/supabase/supabase-client";
import {  CampaignCreateInput, CampaignTableItem, PaginatedCampaigns } from "../types/campaign";

export const createCampaign = async (data: CampaignCreateInput) => {
  const { data: result, error } = await supabaseClient
    .from("campaigns")
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return result;
};

export const getCampaignsTable = async (page: number, pageSize: number): Promise<PaginatedCampaigns> => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, count, error } = await supabaseClient
    .from<"campaigns",CampaignTableItem>("campaigns")
    .select("id, title, category, created_at, collected_amount, target_amount, status", { count: "exact" })
    .order("created_at", { ascending: false })
    .is("deleted_at", null)
    .range(from, to);

  if (error) throw new Error(error.message);
  return { data: data || [], total: count || 0 };
};

export const deleteCampaign = async (id: string) => {
  const { error } = await supabaseClient
    .from("campaigns")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw new Error(error.message);
};