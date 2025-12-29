"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";

export const softDeleteOperationalCost = async (id: string) => {
    const supabase = await supabaseServer();
    const { data, error } = await supabase
        .from("campaign_operational_costs")
        .update({
            deleted_at: new Date().toISOString(),
        })
        .eq("id", id)
        .is("deleted_at", null)
        .select("id");

    if (error) {
        throw new Error(error.message);
    }

    return data?.[0];
};
