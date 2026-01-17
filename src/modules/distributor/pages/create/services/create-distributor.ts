"use server";

import { absoluteUrl } from "@/core/lib/absolute-url";
import { Distributor } from "@/modules/distributor/types/distributor";
import { ActionResult } from "@/core/types/action-result";

export async function createDistributor(
  fullName: string,
  email: string,
  password: string
): Promise<ActionResult<Distributor>> {
  const url = await absoluteUrl('/api/distributor/create');

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, password }),
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      return { success: false, message: result.message || "Gagal membuat distributor" };
    }

    return { success: true, data: result.distributor };
  } catch (err: any) {
    return { success: false, message: err.message || "Terjadi kesalahan jaringan" };
  }
}
