import { supabaseServer } from "@/core/lib/supabase/supabase-server";

export async function POST(req: Request) {
  const data = await req.json();
  const supabase = await supabaseServer();

  const { data: result, error } = await supabase
    .from("campaigns")
    .insert([data])
    .select()
    .single();

  if (error)
    return Response.json({ error: error.message }, { status: 400 });

  return Response.json(result);
}
