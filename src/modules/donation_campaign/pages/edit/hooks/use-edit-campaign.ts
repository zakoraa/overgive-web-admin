"use client";

import { useState } from "react";
import { EditCampaignPayload } from "../types/edit-campaign-payload";
import { updateCampaign } from "../services/update-campaign-service";
import { ActionResult } from "@/core/types/action-result";

export const useEditCampaign = (id: string) => {
  const [loading, setLoading] = useState(false);

  const editCampaign = async (
    payload: EditCampaignPayload
  ): Promise<ActionResult<any>> => {
    setLoading(true);

    try {
      const result = await updateCampaign(id, payload);

      // pastikan result sesuai ActionResult
      return result;
    } catch (err: any) {
      return {
        success: false,
        message: err?.message || "Terjadi kesalahan saat mengubah campaign",
      };
    } finally {
      setLoading(false);
    }
  };

  return { editCampaign, loading };
};
