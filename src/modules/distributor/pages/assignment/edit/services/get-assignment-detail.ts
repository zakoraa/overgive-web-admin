"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";

export async function getAssignmentDetail(id: string) {
    const supabase = await supabaseServer();

    const { data, error } = await supabase
        .from("distributor_assignments")
        .select(`
            id,
            distributor_id,
            campaign_id,
            notes,
            distributor:users!distributor_id ( id, name ),
            campaign:campaigns ( id, title, category )
        `)
        .eq("id", id)
        .is("deleted_at", null)
        .single();

    if (error) throw new Error(error.message);

    // FIX: pastikan relasi bukan array
    const distributor = Array.isArray(data.distributor)
        ? data.distributor[0]
        : data.distributor;

    const campaign = Array.isArray(data.campaign)
        ? data.campaign[0]
        : data.campaign;

    return {
        id: data.id,
        distributor_id: data.distributor_id,
        campaign_id: data.campaign_id,
        notes: data.notes ?? "",
        distributor_name: distributor?.name ?? "",
        campaign_title: campaign?.title ?? "",
        campaign_category: campaign?.category ?? "",
    };
}
