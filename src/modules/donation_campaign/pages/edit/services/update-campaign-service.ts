"use server";

import { absoluteUrl } from "@/core/lib/absolute-url";
import { EditCampaignPayload } from "../types/edit-campaign-payload";
import { ActionResult } from "@/core/types/action-result";

export async function updateCampaign(
  id: string,
  payload: EditCampaignPayload
): Promise<ActionResult> {
  if (!id) {
    return {
      success: false,
      message: "ID tidak valid",
    };
  }

  const url = await absoluteUrl(`/api/campaign/update/${id}`);

  const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const result = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: result.error || result.message || "Gagal memperbarui campaign",
    };
  }

  return {
    success: true,
    data: result.data,
  };
}
