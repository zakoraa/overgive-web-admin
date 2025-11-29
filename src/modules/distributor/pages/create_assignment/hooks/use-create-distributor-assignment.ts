import { useState } from "react";
import { createDistributorAssignment } from "../services/create-distributor-assignment";

export const useCreateAssignment = () => {
  const [loading, setLoading] = useState(false);

  const createAssignment = async (payload: {
    created_by: string;
    distributor_id: string;
    start_date: string | null;
    end_date: string | null;
    notes: string | null;
  }) => {
    try {
      setLoading(true);
      const result = await createDistributorAssignment(payload);
      return result;
    } finally {
      setLoading(false);
    }
  };

  return {
    createAssignment,
    loading,
  };
};
