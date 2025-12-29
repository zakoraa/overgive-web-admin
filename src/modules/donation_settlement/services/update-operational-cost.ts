"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { CampaignOperationalCost } from "../types/campaign-operational-cost";

interface UpdateOperationalCostPayload {
    id: string;
    amount: number;
    note: string | null;
}

export const updateOperationalCost = async ({
    id,
    amount,
    note,
}: UpdateOperationalCostPayload): Promise<CampaignOperationalCost> => {
    const supabase = await supabaseServer();
    const { data, error } = await supabase
        .from("campaign_operational_costs")
        .update({
            amount,
            note,
        })
        .eq("id", id)
        .select()
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};
