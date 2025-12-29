"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { PaginatedCampaignSettlements } from "../types/campaign-settlement";

export const getCampaignsWithSettlements = async (
    page: number,
    pageSize: number,
    search?: string
): Promise<PaginatedCampaignSettlements> => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const supabase = await supabaseServer();

    let query = supabase
        .from("campaigns")
        .select(`
      id,
      title,
      category,
      created_at,
      donation_settlements!inner(id)
    `, { count: "exact" })
        .order("created_at", { ascending: false })
        .range(from, to);

    if (search) {
        query = query.ilike("title", `%${search}%`);
    }

    const { data, count, error } = await query;

    if (error) throw new Error(error.message);

    // Map supaya field donation_settlements hilang, hanya ambil campaign info
    const campaigns = data?.map(({ donation_settlements, ...rest }) => rest) || [];
    return { data: campaigns, total: count || 0 };
};
