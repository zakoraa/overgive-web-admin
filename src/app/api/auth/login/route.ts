import { supabaseServer } from "@/lib/supabase/supabase-server";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const { email, password } = await req.json();
  const supabase = await supabaseServer();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }

  const response = NextResponse.json({
    success: true,
    user: data.user,
  });

  return response;
}
