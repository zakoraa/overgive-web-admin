import { supabaseClient } from "@/lib/supabase/supabase-client";
import { CampaignCreateInput } from "../types/campaign";

export const createCampaign = async (data: CampaignCreateInput) => {
  const { data: result, error } = await supabaseClient
    .from("campaigns")
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return result;
};