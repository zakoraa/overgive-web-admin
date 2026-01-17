import { useState } from "react";
import { createDistributorAssignment } from "../services/create-distributor-assignment";
import { ActionResult } from "@/core/types/action-result"; // pastikan tipe ini sesuai

interface AssignmentPayload {
  assigned_by: string;
  distributor_id: string;
  campaign_id: string;
  notes?: string;
}

export const useCreateAssignment = () => {
  const [loading, setLoading] = useState(false);

  const createAssignment = async (payload: AssignmentPayload) => {
    try {
      setLoading(true);

      const result: ActionResult = await createDistributorAssignment(payload);

      if (!result.success) {
        console.log("ERROR : ", result)

        // throw error agar catch di UI bisa jalan
        throw new Error(result.message || "Gagal membuat penugasan distributor");
      }

      // kalau sukses, return data
      return result.data;
    } catch (err: any) {
        console.log("ERROR : ", err)

      throw new Error(err?.message || "Terjadi kesalahan saat membuat penugasan distributor");
    } finally {
      setLoading(false);
    }
  };

  return { createAssignment, loading };
};
