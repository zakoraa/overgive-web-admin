import { supabaseClient } from "@/lib/supabase/supabase-client";
import { useState } from "react";
import { CampaignCreateInput } from "../types/campaign";
import { compressImage } from "@/utils/image";


export const useAddCampaign = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

const addCampaign = async (data: CampaignCreateInput, file?: File) => {
  setLoading(true);
  setError(null);

  try {
    let payload: CampaignCreateInput = { ...data };

    if (file) {
       const compressedFile = await compressImage(file);

      const fileName = `campaign-${Date.now()}-${file.name}`;
      const { data: uploadData, error: uploadError } = await supabaseClient.storage
        .from("campaign-images")
        .upload(fileName, compressedFile); 

      if (uploadError) throw uploadError;

     const imageUrl =  supabaseClient.storage
        .from("campaign-images")
        .getPublicUrl(uploadData.path).data.publicUrl;

       console.log("imageUrl FILE: ", imageUrl)
 
      payload.image_url = imageUrl; 
    }

    const result = await fetch("/api/campaign/create", {
      method: "POST",
      body: JSON.stringify(payload),
    });;
    return result;

  } catch (err: any) {
    setError(err.message || "Gagal menambahkan kampanye");
    console.log("ERROR BANG saaa", err)

    throw err;
  } finally {
    setLoading(false);
  }
};

  return { addCampaign, loading, error };
};
