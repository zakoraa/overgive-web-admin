"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { CampaignOperationalCost } from "../types/campaign-operational-cost";
import { ActionResult } from "@/core/types/action-result";

interface UpdateOperationalCostPayload {
  id: string;
  amount: number;
  note: string;
  receiptImageUrl?: string | null;
  maxAllowedAmount: number;
}

export const updateOperationalCost = async (
  payload: UpdateOperationalCostPayload
): Promise<ActionResult<CampaignOperationalCost>> => {
  const {
    id,
    amount,
    note,
    receiptImageUrl,
    maxAllowedAmount,
  } = payload;

  const supabase = await supabaseServer();

  // 1. Ambil data existing
  const { data: existingCost, error: existingError } = await supabase
    .from("campaign_operational_costs")
    .select("id, amount, campaign_id")
    .eq("id", id)
    .is("deleted_at", null)
    .single();

  if (existingError || !existingCost) {
    return {
      success: false,
      message: "Data operasional tidak ditemukan",
    };
  }

  // 2. Hitung selisih
  const oldAmount = Number(existingCost.amount);
  const increaseAmount = amount - oldAmount;

  // 3. Validasi limit
  if (increaseAmount > 0 && increaseAmount > maxAllowedAmount) {
    return {
      success: false,
      message: "Biaya operasional melebihi batas maksimum 10%",
    };
  }

  // 4. Update
  const updateData: Record<string, any> = {
    amount,
    note,
  };

  if (receiptImageUrl !== undefined) {
    updateData.receipt_image_url = receiptImageUrl;
  }

  const { data, error } = await supabase
    .from("campaign_operational_costs")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    data,
  };
};
