"use server";

import { ActionResult } from "@/core/types/action-result";
import { CampaignCreateInput } from "../types/campaign-create-input";
import { absoluteUrl } from "@/core/lib/absolute-url";

export async function createCampaign(
  payload: CampaignCreateInput
): Promise<ActionResult> {
  const url = await absoluteUrl("/api/campaign/create");

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
    return {
      success: false,
      message: result.error || "Gagal membuat kampanye",
    };
  }

  return {
    success: true,
    data: result,
  };
}
