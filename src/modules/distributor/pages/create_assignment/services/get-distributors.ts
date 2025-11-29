"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";

export async function getDistributors({
  page = 1,
  limit = 20,
  search = "",
}: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  const supabase = await supabaseServer();

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("users")
    .select("*", { count: "exact" })
    .eq("role", "distributor")
    .is("deleted_at", null)
    .range(from, to);

  // Search by name/email
  if (search.trim() !== "") {
    query = query.or(
      `name.ilike.%${search}%,email.ilike.%${search}%`
    );
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Gagal mengambil data distributor:", error);
    return {
      data: [],
      total: 0,
      hasMore: false,
    };
  }

  return {
    data: data ?? [],
    total: count ?? 0,
    hasMore: to + 1 < (count ?? 0),
  };
}
