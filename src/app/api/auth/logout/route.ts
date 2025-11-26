import { supabaseServer } from "@/lib/supabase/supabase-server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const supabase = await supabaseServer();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.json(
      { message: "Failed to log out", error: error.message },
      { status: 400 }
    );
  }

  return NextResponse.json({ message: "Logged out successfully" });
}
