import { useState } from "react";

export const useDeleteCampaign = () => {
  const [loading, setLoading] = useState(false);

  const deleteCampaign = async (id: string) => {
    if (!id) return { success: false, error: "ID campaign tidak valid" };

    try {
      setLoading(true);

      const res = await fetch(`/api/campaign/delete/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal menghapus campaign");

      return { success: true, data: data.data };
    } catch (err: any) {
      console.error(err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { deleteCampaign, loading };
};
