"use server";

import { absoluteUrl } from "@/core/lib/absolute-url";

export async function deleteDistributorAssignment(id: string) {
    const url = await absoluteUrl(`/api/assignment/delete/${id}`);

    try {
        const res = await fetch(url, {
            method: "DELETE",
            cache: "no-store",
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || "Gagal menghapus penugasan distributor.");
        }

        const result = await res.json();
        return { success: true, data: result.data };
    } catch (err: any) {
        // console.error("ERROR deleteAssignment:", err);
        return { success: false, error: err.message };
    }
}
