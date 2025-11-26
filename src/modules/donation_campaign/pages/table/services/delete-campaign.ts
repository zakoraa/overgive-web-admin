"use server";

import { absoluteUrl } from "@/lib/absolute-url";

export async function deleteCampaignService(id: string) {
  if (!id) return { success: false, error: "ID campaign tidak valid" };

  
  try {
    const url = await absoluteUrl(`/api/campaign/delete/${id}`);
    const res = await fetch(
      url,
      {
        method: "DELETE",
        credentials: "include",
        cache: "no-store",
      }
    );

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Gagal menghapus campaign");

    return { success: true, data: data.data };
  } catch (err: any) {
    console.error(err);
    return { success: false, error: err.message };
  }
}
