"use server";

import { supabaseServer } from "@/lib/supabase/supabase-server";

export async function getCurrentUser() {
    const supabase = await supabaseServer();

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    if (error) {
        console.error("Gagal mengambil user:", error);
        return null;
    }

    return user;
}
