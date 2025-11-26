"use client";

import { useState } from "react";
import { deleteCampaignService } from "../services/delete-campaign";

export const useDeleteCampaign = () => {
  const [loading, setLoading] = useState(false);

  const deleteCampaign = async (id: string) => {
    setLoading(true);

    try {
      return await deleteCampaignService(id);
    } catch (err: any) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { deleteCampaign, loading };
};
