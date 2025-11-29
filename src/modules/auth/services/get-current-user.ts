"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";

export async function getCurrentUser() {
    try {
        const supabase = await supabaseServer();

        const { data: { user }, error } = await supabase.auth.getUser();

        if (error) {
            console.error("Gagal mengambil user:", error.message);
            return null;
        }

        return user;
    } catch (err: any) {
        console.error("Gagal ambil user:", err.message);
        return null;
    }
}
