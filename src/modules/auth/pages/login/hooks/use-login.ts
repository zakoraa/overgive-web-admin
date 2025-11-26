import { useState } from "react";
import { setCookie } from "cookies-next";
import { loginWithEmailPassword } from "../services/login-service";

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const user = await loginWithEmailPassword(email, password);
      const idToken = await user.getIdToken();

      // Simpan token ke cookie
      setCookie("token", idToken);

      return user;
    } catch {
      setError("Login gagal. Harap periksa email dan password.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
