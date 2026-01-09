"use server";
import { supabaseServer } from "@/core/lib/supabase/supabase-server";

export const uploadOperationalReceiptImage = async (file: File) => {
  const supabase = await supabaseServer(); 

  const { data, error } = await supabase.storage
    .from("operational_receipt_images")
    .upload(`${Date.now()}-${file.name}`, file);

  if (error) throw new Error(error.message);

  const { data: urlData } = supabase.storage
    .from("operational_receipt_images")
    .getPublicUrl(data.path);

  return urlData.publicUrl;
};
