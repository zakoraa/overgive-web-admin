"use server";

export async function logoutUser() {
  const res = await fetch("/api/auth/logout", {
    method: "POST",
  });

  return res.json();
}
