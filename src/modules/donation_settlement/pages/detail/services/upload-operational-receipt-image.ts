"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";

export const uploadOperationalReceiptImage = async (file: File): Promise<string> => {
  const supabase = await supabaseServer();

  const fileName = `${Date.now()}-${file.name}`;
  const buffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(buffer);

  const { data, error } = await supabase.storage
    .from("operational_receipt_images")
    .upload(fileName, uint8Array, {
      contentType: file.type,
      upsert: true, // optional: overwrite jika file sama
    });

  if (error || !data?.path) {
    throw new Error(error?.message || "Gagal mengunggah file");
  }

  const { data: urlData } = supabase.storage
    .from("operational_receipt_images")
    .getPublicUrl(data.path);

  if (!urlData?.publicUrl) {
    throw new Error("Gagal mendapatkan URL publik file");
  }

  return urlData.publicUrl;
};
