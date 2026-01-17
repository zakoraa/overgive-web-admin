"use client";

import { useState } from "react";
import { editDistributorAssigment } from "../services/edit-distributor-assignment";

export function useEditAssignment(id: string) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const edit = async (payload: {
        distributor_id: string;
        campaign_id: string;
        notes?: string;
    }) => {
        setLoading(true);
        setError(null);

        try {
            const result = await editDistributorAssigment(id, payload);

            // kalau gagal
            if (!result.success) {
                setError(result.message ?? "Terjadi kesalahan");
                return { data: null, error: result.message };
            }

            // kalau berhasil
            return { data: result.data, error: null };
        } catch (err: any) {
            const message = err?.message ?? "Terjadi kesalahan";
            setError(message);
            return { data: null, error: message };
        } finally {
            setLoading(false);
        }
    };

    return { edit, loading, error };
}
