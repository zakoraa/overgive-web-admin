"use server";

import { absoluteUrl } from "@/core/lib/absolute-url";

export async function createDistributorAssignment(payload: {
  assigned_by: string;
  distributor_id: string;
  campaign_id: string;
  notes?: string;
}) {
  const url = await absoluteUrl("/api/distributor/assignment/create");

  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json();
    console.log("RESS EROR: ", error)

    throw new Error(error.message || "Gagal membuat penugasan distributor.");
  }

  const result = await res.json();
  console.log("RESS OK: ", result)
  return result.data;
}
