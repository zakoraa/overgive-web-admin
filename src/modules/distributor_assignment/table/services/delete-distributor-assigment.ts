"use server";

import { absoluteUrl } from "@/core/lib/absolute-url";
import { ActionResult } from "@/core/types/action-result";

export async function deleteDistributorAssignment(
  id: string
): Promise<ActionResult> {
  if (!id) {
    return { success: false, message: "ID penugasan tidak valid" };
  }

  try {
    const url = await absoluteUrl(`/api/assignment/delete/${id}`);
    const res = await fetch(url, { method: "DELETE", cache: "no-store" });
    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Gagal menghapus penugasan distributor",
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || "Terjadi kesalahan jaringan",
    };
  }
}
