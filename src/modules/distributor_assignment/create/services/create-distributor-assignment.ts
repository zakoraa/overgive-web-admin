"use server";

import { absoluteUrl } from "@/core/lib/absolute-url";
import { ActionResult } from "@/core/types/action-result";

export async function createDistributorAssignment(
  payload: {
    assigned_by: string;
    distributor_id: string;
    campaign_id: string;
    notes?: string;
  }
): Promise<ActionResult> {
  const url = await absoluteUrl("/api/assignment/create");

  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const result = await res.json();

  if (!res.ok) {
        console.log("ERROR : ", result)

    return {
      success: false,
      message: result.message || "Gagal membuat penugasan distributor.",
    };
  }

  return {
    success: true,
    data: result.data,
  };
}
