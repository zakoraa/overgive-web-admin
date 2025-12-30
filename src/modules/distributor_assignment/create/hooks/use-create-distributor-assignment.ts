import { useState } from "react";
import { createDistributorAssignment } from "../services/create-distributor-assignment";

export const useCreateAssignment = () => {
  const [loading, setLoading] = useState(false);

  const createAssignment = async (payload: {
    assigned_by: string;
    distributor_id: string;
    campaign_id: string;
    notes?: string;
  }) => {
    try {
      setLoading(true);
      const result = await createDistributorAssignment(payload);
      // console.error("RESILT membuat penugasan distributor:", result);

      return result;
    } catch (err) {
      // console.error("Gagal membuat penugasan distributor:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createAssignment,
    loading,
  };
};
