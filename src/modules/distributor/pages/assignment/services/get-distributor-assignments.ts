"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";

export const getDistributorAssignments = async ({
    page = 1,
    limit = 10,
}: {
    page?: number;
    limit?: number;
}) => {
    const supabase = await supabaseServer();

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const query = supabase
        .from("distributor_assignments")
        .select(
            `
        id,
        assigned_at,
        distributor:users!distributor_id ( id, full_name ),
        assigned_by_user:users!assigned_by ( id, full_name ),
        campaign:campaigns ( id, title, category )
      `,
            { count: "exact" }
        )
        .is("deleted_at", null)
        .order("assigned_at", { ascending: false })
        .range(from, to);

    const { data, error, count } = await query;
    console.log("DATA ASSIGNMENTS: ", data)
    console.log("ERROR ASSIGNMENTS: ", error)
    if (error) throw new Error(error.message);

    return {
        data:
            data?.map((x: any) => ({
                id: x.id,
                distributor_id: x.distributor?.id ?? "",
                distributor_name: x.distributor?.full_name ?? "",
                campaign_id: x.campaign?.id ?? "",
                campaign_title: x.campaign?.title ?? "",
                campaign_category: x.campaign?.category ?? "",
                assigned_by: x.assigned_by_user?.id ?? "",
                assigned_by_name: x.assigned_by_user?.full_name ?? "",
                assigned_at: x.assigned_at,
            })) ?? [],
        total: count ?? 0,
        totalPages: Math.ceil((count ?? 0) / limit),
    };
};
