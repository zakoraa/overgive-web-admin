"use server"

import { absoluteUrl } from "@/lib/absolute-url";

export async function loginWithEmailPassword(email:string, password:string) {
  const url = await absoluteUrl('/api/auth/login')
  const res = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) return null;

  const { user } = await res.json();
  return user;
}
