import { NextResponse } from "next/server";
import { supabaseServer } from "@/core/lib/supabase/supabase-server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "File tidak ditemukan" }, { status: 400 });
    }

    const supabase = await supabaseServer();

    const fileName = `campaign-${Date.now()}-${file.name}`;
    const buffer = await file.arrayBuffer();
    const uint8 = new Uint8Array(buffer);

    const { data, error } = await supabase.storage
      .from("campaign-images")
      .upload(fileName, uint8, {
        contentType: file.type,
      });

    if (error) throw error;

    const publicUrl = supabase.storage
      .from("campaign-images")
      .getPublicUrl(data.path).data.publicUrl;

    return NextResponse.json({
      success: true,
      url: publicUrl,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
