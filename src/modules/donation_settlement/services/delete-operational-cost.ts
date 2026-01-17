"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { ActionResult } from "@/core/types/action-result";

export const softDeleteOperationalCost = async (
  id: string
): Promise<ActionResult<{ id: string }>> => {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("campaign_operational_costs")
    .update({
      deleted_at: new Date().toISOString(),
    })
    .eq("id", id)
    .is("deleted_at", null)
    .select("id")
    .single();

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  if (!data) {
    return {
      success: false,
      message: "Data tidak ditemukan atau sudah dihapus",
    };
  }

  return {
    success: true,
    data,
  };
};
