"use server";

import { absoluteUrl } from "@/core/lib/absolute-url";

export async function deleteUser(id: string) {
  const url = await absoluteUrl(`/api/user/delete/${id}`);

  try {
    const res = await fetch(url, {
      method: "DELETE",
      cache: "no-store",
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Gagal menghapus user.");
    }

    const result = await res.json();
    return { success: true, data: result.data };
  } catch (err: any) {
    console.error("ERROR softDeleteUser:", err);
    return { success: false, error: err.message };
  }
}
