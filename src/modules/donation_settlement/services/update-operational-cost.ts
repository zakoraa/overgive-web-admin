"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { CampaignOperationalCost } from "../types/campaign-operational-cost";

interface UpdateOperationalCostPayload {
  id: string;
  amount: number;
  note: string;
  receiptImageUrl?: string | null;
  maxAllowedAmount: number; // 10% dari total
}

export const updateOperationalCost = async ({
  id,
  amount,
  note,
  receiptImageUrl,
  maxAllowedAmount,
}: UpdateOperationalCostPayload): Promise<CampaignOperationalCost> => {
  const supabase = await supabaseServer();

  // 1. Ambil data operasional yang mau diupdate
  const { data: existingCost, error: existingError } = await supabase
    .from("campaign_operational_costs")
    .select("id, amount, campaign_id")
    .eq("id", id)
    .single();

  if (existingError || !existingCost) {
    throw new Error("Data operasional tidak ditemukan");
  }

  // 2. Ambil total operasional campaign
  const { data: opsCosts, error: opsError } = await supabase
    .from("campaign_operational_costs")
    .select("amount")
    .eq("campaign_id", existingCost.campaign_id);

  if (opsError) {
    throw new Error(opsError.message);
  }

  const totalExistingAmount =
    opsCosts?.reduce((sum, item) => sum + Number(item.amount), 0) ?? 0;

  // 3. Hitung total setelah update
  const totalAfterUpdate =
    totalExistingAmount - Number(existingCost.amount) + amount;

  // 4. Validasi 10%
  if (totalAfterUpdate > maxAllowedAmount) {
    throw new Error("Biaya operasional melebihi batas maksimum 10%");
  }

  // 5. Update data
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
    throw new Error(error.message);
  }

  return data;
};
