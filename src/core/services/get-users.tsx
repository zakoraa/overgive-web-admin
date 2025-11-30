"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { UserRole } from "../types/user";

export async function getUsers({
  page = 1,
  limit = 10,
  search = "",
  role = "distributor",
}: {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
}) {
  const supabase = await supabaseServer();

  const from = (page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("users")
    .select("*", { count: "exact" })
    .eq("role", role)
    .is("deleted_at", null)
    .range(from, to);

  if (search.trim() !== "") {
    query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("Gagal mengambil data distributor:", error);
    return {
      data: [],
      total: 0,
      totalPages: 1,
      hasMore: false,
    };
  }

  const total = count ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return {
    data: data ?? [],
    total,
    totalPages,
    hasMore: to + 1 < total,
  };
}
