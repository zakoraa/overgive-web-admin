"use server";

export async function loginWithEmailPassword(email: string, password: string) {
  const res = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  return res.json();
}
