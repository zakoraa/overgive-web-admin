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

    // 3. Hitung total setelah update
    const oldAmount = Number(existingCost.amount);
    const increaseAmount = amount - oldAmount;

    console.log("oldAmount AMOUNT:", oldAmount);
    console.log("INCREASE AMOUNT:", increaseAmount);
    console.log("MAX ALLOWED:", maxAllowedAmount);

    // kalau naik, cek kuota
    if (increaseAmount > 0 && increaseAmount > maxAllowedAmount) {
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
