import { supabaseServer } from "@/lib/supabase/supabase-server";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await supabaseServer();

  await supabase.auth.signOut();

  return NextResponse.json({ success: true });
}
