"use server";

import { absoluteUrl } from "@/core/lib/absolute-url";
import { ActionResult } from "@/core/types/action-result";

export async function editDistributorAssigment(
  id: string,
  payload: {
    distributor_id: string;
    campaign_id: string;
    notes?: string;
  }
): Promise<ActionResult> {
  const url = await absoluteUrl(`/api/assignment/update/${id}`);

  const res = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  const result = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: result.message || "Gagal mengubah penugasan distributor.",
    };
  }

  return {
    success: true,
    data: result.data,
  };
}