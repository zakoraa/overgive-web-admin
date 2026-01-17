"use server";

import { ActionResult } from "@/core/types/action-result";
import { absoluteUrl } from "@/core/lib/absolute-url";

export async function uploadCampaignThumbnail(
  file: File
): Promise<ActionResult<{ url: string }>> {
  const form = new FormData();
  form.append("file", file);

  const url = await absoluteUrl("/api/campaign/upload-thumbnail");

  const res = await fetch(url, {
    method: "POST",
    body: form,
    cache: "no-store",
  });

  const result = await res.json();

  if (!res.ok) {
    return {
      success: false,
      message: result.message || "Gagal upload thumbnail",
    };
  }

  return {
    success: true,
    data: { url: result.url },
  };
}
