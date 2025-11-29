"use server"

import { supabaseServer } from "@/core/lib/supabase/supabase-server";

export async function loginWithEmailPassword(email: string, password: string) {
  const supabase = await supabaseServer();


  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    let message = error.message
    switch (message) {
      case "Invalid login credentials":
        message = "Email atau password salah"
        break;
      default:
        message = "Terjadi kesalahan yang tidak diketahui"
        break;
    }
    return { success: false, message: message }
  }

  return { success: true, message: 'Login berhasil!' }
}
