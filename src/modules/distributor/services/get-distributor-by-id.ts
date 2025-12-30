"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { User } from "@/core/types/user";

export async function getDistributorById(id: string): Promise<User | null> {
    const supabase = await supabaseServer();

    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("id", id)
        .eq("role", "distributor")
        .is("deleted_at", null)
        .maybeSingle();

    if (error) throw new Error(error.message);
    if (!data) return null;

    return data as User;
}
