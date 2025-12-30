"use server";

import { absoluteUrl } from "@/core/lib/absolute-url";

export async function sendGeneratePassword(fullName: string, email: string, password: string) {
    const url = await absoluteUrl('/api/distributor/send-email');

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullName, email, password }),
        });

        if (!res.ok) {
            const errMsg = await res.text();
            // console.error("Server error:", errMsg);
            return null;
        }

        return await res.json();
    } catch (err) {
        // console.error("Fetch API error:", err);
        return null;
    }
}
