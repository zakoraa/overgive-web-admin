import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await supabaseServer();
    const body = await req.json();

    const {
      name,
      background_html,
      category,
      status,
      target_amount,
      ended_at,
      image_file_base64,
    } = body;

    let imageUrl: string | null = null;

    if (image_file_base64) {
      const match = image_file_base64.match(/^data:(.+);base64,(.*)$/);
      if (!match) {
        return NextResponse.json(
          { message: "Format gambar tidak valid" },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(match[2], "base64");
      const ext = match[1].split("/")[1];
      const fileName = `campaign-${Date.now()}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("campaign-images")
        .upload(fileName, buffer, { upsert: true });

      if (uploadError) {
        return NextResponse.json(
          { message: uploadError.message },
          { status: 500 }
        );
      }

      const { data } = supabase.storage
        .from("campaign-images")
        .getPublicUrl(fileName);

      imageUrl = data.publicUrl;
    }

    const updatePayload: any = {};
    if (name) updatePayload.title = name;
    if (background_html) updatePayload.background_html = background_html;
    if (category) updatePayload.category = category;
    if (status) updatePayload.status = status;
    if (target_amount !== undefined) updatePayload.target_amount = target_amount;
    updatePayload.ended_at = ended_at ?? null;
    if (imageUrl) updatePayload.image_url = imageUrl;

    const { data, error } = await supabase
      .from("campaigns")
      .update(updatePayload)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error("UPDATE CAMPAIGN ERROR:", err);
    return NextResponse.json(
      { message: "Terjadi kesalahan sistem" },
      { status: 500 }
    );
  }
}
