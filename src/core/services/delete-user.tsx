"use server";

import { absoluteUrl } from "@/core/lib/absolute-url";
import { ActionResult } from "@/core/types/action-result";

export async function deleteUser(id: string): Promise<ActionResult> {
  if (!id) {
    return { success: false, message: "ID user tidak valid" };
  }

  const url = await absoluteUrl(`/api/user/delete/${id}`);

  try {
    const res = await fetch(url, {
      method: "DELETE",
      cache: "no-store",
    });

    const result = await res.json();

    if (!res.ok) {
      return { success: false, message: result.error || "Gagal menghapus user" };
    }

    return { success: true, data: result.data };
  } catch (err: any) {
    return { success: false, message: err.message || "Terjadi kesalahan jaringan" };
  }
}
