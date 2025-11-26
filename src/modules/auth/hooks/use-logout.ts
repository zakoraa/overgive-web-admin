"use client";

import { useState } from "react";
import { logoutUser } from "../services/logout-service";
import { setCookie } from "cookies-next";

export function useLogout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logout = async () => {
    setLoading(true);
    setError(null);

    try {
      await logoutUser();

      setCookie("token", "", {
        maxAge: 0,
        path: "/",
      });

    } catch (err: any) {
      console.log("LOGOUT GAGAL: ", err.message)
      setError(err.message || "Logout gagal");
    } finally {
      setLoading(false);
    }
  };

  return { logout, loading, error };
}
