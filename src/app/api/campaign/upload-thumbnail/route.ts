import { NextResponse } from "next/server";
import { supabaseServer } from "@/core/lib/supabase/supabase-server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { message: "File tidak ditemukan" },
        { status: 400 }
      );
    }

    const supabase = await supabaseServer();

    const fileName = `campaign-${Date.now()}-${file.name}`;
    const buffer = await file.arrayBuffer();

    const { data, error } = await supabase.storage
      .from("campaign-images")
      .upload(fileName, new Uint8Array(buffer), {
        contentType: file.type,
      });

    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 400 }
      );
    }

    const publicUrl = supabase.storage
      .from("campaign-images")
      .getPublicUrl(data.path).data.publicUrl;

    return NextResponse.json({
      success: true,
      url: publicUrl,
    });
  } catch (err) {
    console.error("UPLOAD THUMBNAIL ERROR:", err);
    return NextResponse.json(
      { message: "Gagal mengunggah thumbnail" },
      { status: 500 }
    );
  }
}
