"use client";

import { useState } from "react";
import { EditCampaignPayload } from "../types/campaign";

export const useEditCampaign = (id: string) => {
  const [loading, setLoading] = useState(false);

  const editCampaign = async (payload: EditCampaignPayload) => {
    console.log("IDNyA: ", id)
    
    if (!id) return { success: false, error: "Gagal Memperbarui Kampanye" };
;
    try {
      setLoading(true);

    const res = await fetch(`/api/campaign/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });


      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update campaign");

      return { success: true, data: data.data };
    } catch (err: any) {
      console.error(err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { editCampaign, loading };
};
