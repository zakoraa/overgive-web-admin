"use server";

import { absoluteUrl } from "@/lib/absolute-url";
import { EditCampaignPayload } from "../types/edit-campaign-payload";

export async function updateCampaign(id: string, payload: EditCampaignPayload) {
  if (!id) {
    return { success: false, error: "ID tidak valid" };
  }
  const url = await absoluteUrl(`/api/campaign/update/${id}`);

  try {
    const res = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: "include",
    cache: "no-store",
  });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Gagal memperbarui campaign");

    return { success: true, data: data.data };
  } catch (err: any) {
    console.error(err);
    return { success: false, error: err.message };
  }
}
