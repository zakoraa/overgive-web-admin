"use server";

import { absoluteUrl } from "@/lib/absolute-url";

export async function logoutUser() {
  const url = await absoluteUrl('/api/auth/logout');
  
  const res = await fetch(url, {
    method: "POST",
  });

  return res.json();
}
