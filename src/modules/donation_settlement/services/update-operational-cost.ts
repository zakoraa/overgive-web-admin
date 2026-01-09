"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { CampaignOperationalCost } from "../types/campaign-operational-cost";

interface UpdateOperationalCostPayload {
    id: string;
    amount: number;
    note: string;
    receiptImageUrl?: string | null;
}

export const updateOperationalCost = async ({
    id,
    amount,
    note,
    receiptImageUrl,
}: UpdateOperationalCostPayload): Promise<CampaignOperationalCost> => {
    const supabase = await supabaseServer();

    const updateData: Record<string, any> = {
        amount,
        note,
    };

    // Tambahkan receipt_image_url jika ada
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
