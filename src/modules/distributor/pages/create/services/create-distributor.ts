"use server";

import { absoluteUrl } from "@/core/lib/absolute-url";
import { Distributor } from "@/modules/distributor/types/distributor";

export async function createDistributor(fullName: string, email: string, password: string): Promise<Distributor | null> {
    const url = await absoluteUrl('/api/distributor/create');

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullName, email, password }),
        });

        if (!res.ok) return null;

        const distributor: Distributor = await res.json();
        return distributor;
    } catch (err) {
        // console.error("Fetch API error:", err);
        return null;
    }
}
