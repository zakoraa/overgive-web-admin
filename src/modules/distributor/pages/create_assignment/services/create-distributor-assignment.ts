"use server";

export async function createDistributorAssignment(payload: {
  created_by: string;
  distributor_id: string;
  start_date: string | null;
  end_date: string | null;
  notes: string | null;
}) {
  const res = await fetch(`/api/distributor/create-assignment`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Gagal membuat penugasan distributor.");
  }

  const result = await res.json();
  return result.data;
}
