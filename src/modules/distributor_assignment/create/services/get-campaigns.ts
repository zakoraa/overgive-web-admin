"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";

export async function getCampaigns({
    page = 1,
    limit = 20,
    search = "",
}) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const today = new Date().toISOString();
    const supabase = await supabaseServer();

    // Ambil semua campaign_id yang sudah ada di distributor_assignments
    // const { data: assignedCampaigns, error: assignedError } = await supabase
    //     .from("distributor_assignments")
    //     .select("campaign_id")
    //     .is("deleted_at", null);

    // if (assignedError) throw new Error(assignedError.message);

    // const assignedIds = assignedCampaigns?.map((c) => c.campaign_id) || [];

    // Query campaigns yang belum ditugaskan
    let query = supabase
        .from("campaigns")
        .select("id, title, category, status, ended_at", { count: "exact" })
        .eq("status", "active")
        .or(`ended_at.gte.${today},ended_at.is.null`)
        .is("deleted_at", null)
        // .not("id", "in", `(${assignedIds.map((id) => `${id}`).join(",")})`)
        .order("created_at", { ascending: false })
        .range(from, to);

    if (search) {
        query = query.ilike("title", `%${search}%`);
    }

    const { data, count, error } = await query;

    if (error) throw new Error(error.message);

    return {
        data: data || [],
        hasMore: data && data.length === limit,
        total: count || 0,
    };
}
