import { supabaseClient } from "@/lib/supabase/supabase-client";
import { useState } from "react";
import { createCampaign } from "../services/campaign-service";
import { CampaignCreateInput } from "../types/campaign";


export const useCampaign = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

const addCampaign = async (data: CampaignCreateInput, file?: File) => {
  setLoading(true);
  setError(null);

  try {
    let payload: CampaignCreateInput = { ...data };

    if (file) {
      const fileName = `campaign-${Date.now()}-${file.name}`;
      const { data: uploadData, error: uploadError } = await supabaseClient.storage
        .from("campaign-images")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

     const imageUrl =  supabaseClient.storage
        .from("campaign-images")
        .getPublicUrl(uploadData.path).data.publicUrl;
 
      payload.image_url = imageUrl; 
    }

    const result = await createCampaign(payload);
    return result;

  } catch (err: any) {
    setError(err.message || "Gagal menambahkan kampanye");
    throw err;
  } finally {
    setLoading(false);
  }
};

  return { addCampaign, loading, error };
};
