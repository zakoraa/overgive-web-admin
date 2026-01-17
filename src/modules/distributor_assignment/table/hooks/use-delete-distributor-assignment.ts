"use client";

import { useState } from "react";
import { deleteDistributorAssignment } from "../services/delete-distributor-assigment";

export function useDeleteDistributorAssignment() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const remove = async (id: string) => {
        setLoading(true);
        setError(null);

        try {
            const result = await deleteDistributorAssignment(id);

            if (!result.success) {
                const msg = result.message ?? "Terjadi kesalahan";
                setError(msg);
                return { data: null, error: msg };
            }

            return { data: result.data, error: null };
        } catch (err: any) {
            const message = err?.message ?? "Terjadi kesalahan";
            setError(message);
            return { data: null, error: message };
        } finally {
            setLoading(false);
        }
    };

    return { remove, loading, error };
}
