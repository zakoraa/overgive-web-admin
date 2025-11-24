"use server";

import {  Campaign, CampaignTableItem, PaginatedCampaigns } from "../types/campaign";
import { supabaseServer } from "@/lib/supabase/supabase-server";


export const getCampaignDetail = async (id: string): Promise<Campaign | null> => {
  const supabase = await supabaseServer(); // ambil client server
  console.log(`ID: ${id}`)

  const { data, error } = await supabase
    .from("campaigns")
    .select("*")
    .eq("id", id)
    .is("deleted_at", null)
    .single();

    console.log(`data: ${data}`)
    
    if (error) {
    console.log(`erro:`, error)
    if (error.code === "PGRST116") return null;
    throw new Error(error.message);
  }
  
if (!data) return null;

const campaign: Campaign = {
  id: data.id,
  title: data.title,
  imageUrl: data.image_url,
  backgroundHtml: data.background_html,
  category: data.category,
  targetAmount: data.target_amount,
  collectedAmount: data.collected_amount,
  status: data.status,
  createdBy: data.created_by,
  endedAt: data.ended_at,
  createdAt: data.created_at,
  deletedAt: data.deleted_at,
};


return campaign;
};


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

export const deleteCampaign = async (id: string) => {
  const supabase = await supabaseServer();
  const { error } = await supabase
    .from("campaigns")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw new Error(error.message);
};