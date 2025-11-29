// api/campaign/update/[id]/route.ts
import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {

  try {
    const supabase = await supabaseServer();
    const { id } = await params;
    console.log("IDNYA INI: ", id)
    const body = await req.json();

    const {
      name,
      background_html,
      category,
      status,
      target_amount,
      ended_at,
      image_file_base64, // file image dikirim sebagai base64 string
    } = body;

    let imageUrl: string | null = null;

    // === Upload ke Supabase Storage kalau ada ===
    if (image_file_base64) {
      const base64Regex = /^data:(.+);base64,(.*)$/;
      const match = image_file_base64.match(base64Regex);

      if (!match) return NextResponse.json({ error: "Invalid image format" }, { status: 400 });

      const buffer = Buffer.from(match[2], "base64");
      const ext = match[1].split("/")[1]; // misal image/png → png
      const fileName = `campaign-${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("campaign-images")
        .upload(fileName, buffer, { upsert: true });

      if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 500 });

      const { data } = supabase.storage.from("campaign-images").getPublicUrl(fileName);
      if (!data) throw new Error("Gagal mendapatkan URL publik");
      const publicUrl = data.publicUrl;

      imageUrl = publicUrl;
    }

    // === Prepare payload untuk update ===
    const updatePayload: any = {};
    if (name) updatePayload.title = name;
    if (background_html) updatePayload.background_html = background_html;
    if (category) updatePayload.category = category;
    if (status) updatePayload.status = status;
    if (target_amount !== undefined) updatePayload.target_amount = target_amount;
    if (ended_at) updatePayload.ended_at = ended_at;
    if (imageUrl) updatePayload.image_url = imageUrl;

    const { data, error } = await supabase
      .from("campaigns")
      .update(updatePayload)
      .eq("id", id)
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json({ data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Something went wrong" }, { status: 500 });
  }
}
