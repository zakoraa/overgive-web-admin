"use server";

import { absoluteUrl } from "@/core/lib/absolute-url";
import { ActionResult } from "@/core/types/action-result";

export async function sendGeneratePassword(
    fullName: string,
    email: string,
    password: string
): Promise<ActionResult> {
    const url = await absoluteUrl('/api/distributor/send-email');

    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullName, email, password }),
            cache: "no-store",
        });

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                message: result.message || "Gagal mengirim email",
            };
        }

        return {
            success: true,
            data: result,
        };
    } catch (err: any) {
        return {
            success: false,
            message: err.message || "Terjadi kesalahan jaringan",
        };
    }
}
