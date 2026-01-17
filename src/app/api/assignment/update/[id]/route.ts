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

    // === 1. Cek apakah distributor sudah ditugaskan ke campaign ini (aktif) ===
    const { data: existing, error: checkError } = await supabase
      .from("distributor_assignments")
      .select("id")
      .eq("distributor_id", distributor_id)
      .eq("campaign_id", campaign_id)
      .is("deleted_at", null)
      .maybeSingle();

    if (checkError) {
      return NextResponse.json({ message: checkError.message }, { status: 500 });
    }

    // Jika ada assignment aktif lain dengan distributor + campaign sama tapi id berbeda
    if (existing && existing.id !== id) {
      return NextResponse.json(
        { message: "Distributor sudah ditugaskan ke campaign ini" },
        { status: 409 } // Conflict
      );
    }

    // === 2. Update assignment ===
    const { data, error } = await supabase
      .from("distributor_assignments")
      .update({ distributor_id, campaign_id, notes })
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "success", data });
  } catch (err: any) {
    return NextResponse.json(
      { message: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
