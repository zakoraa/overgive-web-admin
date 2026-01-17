"use client";

import { useState } from "react";
import { uploadCampaignThumbnail } from "../services/upload-campaign-thumbnail";
import { createCampaign } from "../services/create-campaign";
import { compressImage } from "@/core/utils/image";
import { CampaignCreateInput } from "../types/campaign-create-input";
import { ActionResult } from "@/core/types/action-result";

export const useCreateCampaign = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addCampaign = async (
    data: CampaignCreateInput,
    file?: File
  ): Promise<ActionResult<any>> => {
    setLoading(true);
    setError(null);

    try {
      let payload: CampaignCreateInput = { ...data };

      if (file) {
        const compressedFile = await compressImage(file);
        const uploadResult = await uploadCampaignThumbnail(compressedFile);

        if (!uploadResult.success) {
          setError(uploadResult.message);
          return { success: false, message: uploadResult.message };
        }

        payload.image_url = uploadResult.data.url;
      }

      const result = await createCampaign(payload);

      if (!result.success) {
        setError(result.message);
        return { success: false, message: result.message };
      }

      return { success: true, data: result.data };
    } catch (err: any) {
      setError(err.message || "Gagal menambahkan campaign");
      return { success: false, message: err.message || "Gagal menambahkan campaign" };
    } finally {
      setLoading(false);
    }
  };

  return { addCampaign, loading, error };
};
