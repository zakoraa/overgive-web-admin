"use server";

import { absoluteUrl } from "@/core/lib/absolute-url";

export async function editDistributorAssigment(id: string, payload: {
    distributor_id: string;
    campaign_id: string;
    notes?: string;
}) {
    const url = await absoluteUrl(`/api/assignment/update/${id}`);

    try {
        const res = await fetch(url, {
            method: "PUT",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || "Gagal mengubah penugasan distributor.");
        }

        const result = await res.json();
        return { success: true, data: result.data };
    } catch (err: any) {
        // console.error("ERROR updateAssignment:", err);
        return { success: false, error: err.message };
    }
}
