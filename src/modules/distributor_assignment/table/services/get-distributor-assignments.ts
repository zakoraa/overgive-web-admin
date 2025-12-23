"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";

export const getDistributorAssignments = async ({
    page = 1,
    limit = 10,
    search = "",
}: {
    page?: number;
    limit?: number;
    search?: string;
}) => {
    try {
        const supabase = await supabaseServer();
        const from = (page - 1) * limit;
        const to = from + limit - 1;

        let query = supabase
            .from("distributor_assignments")
            .select(
                `
        id,
        assigned_at,
        distributor:users!distributor_id ( id, name, email ),
        assigned_by_user:users!assigned_by ( id, name, email ),
        campaign:campaigns ( id, title, category )
        `,
                { count: "exact" }
            )
            .is("deleted_at", null)
            .order("assigned_at", { ascending: false })
            .range(from, to);


        const { data, error, count } = await query;

        let filteredData = data ?? [];

        if (search.trim() !== "") {
            filteredData = filteredData.filter(
                (x: any) => x.campaign?.title?.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (error) {
            console.error("ERROR FETCH ASSIGNMENTS:", error);
            throw new Error(error.message);
        }

        return {
            data:
                filteredData?.map((x: any) => ({
                    id: x.id,
                    distributor_id: x.distributor?.id ?? "",
                    distributor_name: x.distributor?.name ?? "",
                    distributor_email: x.distributor?.email ?? "",
                    campaign_id: x.campaign?.id ?? "",
                    campaign_title: x.campaign?.title ?? "",
                    campaign_category: x.campaign?.category ?? "",
                    assigned_by: x.assigned_by_user?.id ?? "",
                    assigned_by_name: x.assigned_by_user?.name ?? "",
                    assigned_by_email: x.assigned_by_user?.email ?? "",
                    assigned_at: x.assigned_at,
                })) ?? [],
            total: count ?? 0,
            totalPages: Math.ceil((count ?? 0) / limit),
        };
    } catch (err: any) {
        console.error("UNEXPECTED ERROR getDistributorAssignments:", err);
        return {
            data: [],
            total: 0,
            totalPages: 1,
        };
    }
};
