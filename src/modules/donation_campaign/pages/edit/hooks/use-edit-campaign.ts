"use client";

import { useState } from "react";
import { EditCampaignPayload } from "../types/edit-campaign-payload";
import { updateCampaign } from "../services/update-campaign-service";

export const useEditCampaign = (id: string) => {
  const [loading, setLoading] = useState(false);

 const editCampaign = async (payload: EditCampaignPayload) => {
    setLoading(true);

    try {
      const result = await updateCampaign(id, payload);
      return result;
    } catch (err: any) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { editCampaign, loading };
};
