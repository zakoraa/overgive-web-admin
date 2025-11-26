"use client"
import { useState } from "react";
import { loginWithEmailPassword } from "../services/login-service";
import { setCookie } from "cookies-next";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const user = await loginWithEmailPassword(email, password);
      console.log("LOGIN user: ", user);
      setCookie("token", user.id);


      return user;
    } catch(err) {
      console.log("ERROR USE_LOGIN: ", err)
      setError("Login gagal. Harap periksa email dan password.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
