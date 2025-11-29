"use server";

import { supabaseServer } from "@/lib/supabase/supabase-server";

export async function getCampaigns({
  page = 1,
  limit = 20,
  search = "",
}) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const today = new Date().toISOString();

  const supabase = await supabaseServer();

  let query = supabase
    .from("campaigns")
    .select(
      "id, title, category, status, ended_at",
      { count: "exact" }
    )
    .eq("status", "active")
    .gte("ended_at", today)
    .is("deleted_at", null)
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
