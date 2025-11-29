import { useState } from "react";
import { uploadCampaignThumbnail } from "../services/upload-campaign-thumbnail";
import { createCampaign } from "../services/create-campaign";
import { compressImage } from "@/core/utils/image";
import { CampaignCreateInput } from "../types/campaign-create-input";


export const useCreateCampaign = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addCampaign = async (data: CampaignCreateInput, file?: File) => {
    setLoading(true);
    setError(null);
    try {
      let payload: CampaignCreateInput = { ...data };

      if (file) {
        const compressedFile = await compressImage(file);
        const uploadResult = await uploadCampaignThumbnail(compressedFile);

        if (!uploadResult.success) throw new Error("Gagal upload thumbnail");

        payload.image_url = uploadResult.url;
      }

      const result = await createCampaign(payload);
      return result;

    } catch (err: any) {
      console.log("ERROR:", err);
      setError(err.message || "Gagal menambahkan campaign");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { addCampaign, loading, error };
};
