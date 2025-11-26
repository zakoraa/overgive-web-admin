"use server";

import { supabaseServer } from "@/lib/supabase/supabase-server";

export const deleteCampaign = async (id: string) => {
  const supabase = await supabaseServer();
  const { error } = await supabase
    .from("campaigns")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);

  if (error) throw new Error(error.message);
};

