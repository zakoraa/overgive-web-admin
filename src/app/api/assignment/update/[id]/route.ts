import { NextResponse } from "next/server";
import { supabaseServer } from "@/core/lib/supabase/supabase-server";

export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const body = await req.json();
    const { distributor_id, campaign_id, notes = null } = body;

    if (!distributor_id || !campaign_id) {
      return NextResponse.json(
        { message: "distributor_id dan campaign_id wajib diisi" },
        { status: 400 }
      );
    }

    const supabase = await supabaseServer();

    const { data, error } = await supabase
      .from("distributor_assignments")
      .update({
        distributor_id,
        campaign_id,
        notes,
      })
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      console.error("ERROR UPDATE ASSIGNMENT:", error);
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "success", data });
  } catch (err) {
    console.error("ERROR UPDATE ASSIGNMENT:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
