"use client";

import { useEffect, useState } from "react";
import { getAssignmentDetail } from "../services/get-assignment-detail";

export function useAssignmentDetail(id: string) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const load = async () => {
        try {
            setLoading(true);
            setError(null);

            const result = await getAssignmentDetail(id);
            setData(result);
            // console.log("DATA DETAIL :", result)
        } catch (err: any) {
            // console.log("DATA DETAIL ERROR :", err)
            setError(err.message ?? "Terjadi kesalahan");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) load();
    }, [id]);

    return { data, loading, error, reload: load };
}
