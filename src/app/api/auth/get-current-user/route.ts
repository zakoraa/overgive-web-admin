"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = await supabaseServer();

    const { data: { user }, error } = await supabase.auth.getUser();

    if (error) {
        return NextResponse.json({ user: null, message: error.message }, { status: 400 });
    }

    return NextResponse.json({ user });
}
