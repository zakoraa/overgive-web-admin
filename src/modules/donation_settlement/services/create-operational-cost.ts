"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { formatRupiah } from "@/core/utils/currency";
import { ActionResult } from "@/core/types/action-result";

interface OperationalCostInput {
  campaignId: string;
  amount: number;
  maxAllowedAmount: number;
  receiptImageUrl: string;
  note: string;
}

export const createOperationalCost = async (
  input: OperationalCostInput
): Promise<ActionResult> => {
  const supabase = await supabaseServer();

  // 1. Auth
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      success: false,
      message: "User belum login",
    };
  }

  // 2. Ambil user internal
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("auth_id", user.id)
    .single();

  if (userError || !userData) {
    return {
      success: false,
      message: "Data user tidak ditemukan",
    };
  }

  // 3. Ambil total biaya existing
  const { data: opsCosts, error: opsError } = await supabase
    .from("campaign_operational_costs")
    .select("amount")
    .eq("campaign_id", input.campaignId)
    .is("deleted_at", null);

  if (opsError) {
    return {
      success: false,
      message: opsError.message,
    };
  }

  if (input.amount > input.maxAllowedAmount) {
  return {
    success: false,
    message: `Biaya operasional melebihi batas maksimum (${formatRupiah(
      input.maxAllowedAmount
    )})`,
  };
}

  // 4. Insert
  const { data, error } = await supabase
    .from("campaign_operational_costs")
    .insert({
      campaign_id: input.campaignId,
      amount: input.amount,
      note: input.note,
      receipt_image_url: input.receiptImageUrl,
      created_by: userData.id,
    })
    .select("*")
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
