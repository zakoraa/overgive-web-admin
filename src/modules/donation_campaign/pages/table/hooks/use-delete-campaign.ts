"use client";

import { useState } from "react";
import { deleteCampaignService } from "../services/delete-campaign";
import { ActionResult } from "@/core/types/action-result";

export const useDeleteCampaign = () => {
  const [loading, setLoading] = useState(false);

  const deleteCampaign = async (id: string): Promise<ActionResult<any>> => {
    setLoading(true);

    try {
      const result = await deleteCampaignService(id);

      return result;
    } catch (err: any) {
      return { success: false, message: err?.message || "Terjadi kesalahan" };
    } finally {
      setLoading(false);
    }
  };

  return { deleteCampaign, loading };
};
