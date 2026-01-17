import { NextResponse } from "next/server";
import { supabaseServer } from "@/core/lib/supabase/supabase-server";

export async function POST(req: Request) {
  const payload = await req.json();
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("campaigns")
    .insert([payload])
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { message: error.message },
      { status: 400 }
    );
  }

  return NextResponse.json(data);
}
