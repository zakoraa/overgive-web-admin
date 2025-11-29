import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { error: "ID campaign tidak ditemukan" },
        { status: 400 }
      );
    }

    const supabase = await supabaseServer();

    // update deleted_at dengan timestamp sekarang
    const { data, error } = await supabase
      .from("campaigns")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Terjadi kesalahan" },
      { status: 500 }
    );
  }
}
