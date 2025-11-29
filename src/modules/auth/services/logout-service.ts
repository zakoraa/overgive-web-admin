"use server";

import { supabaseServer } from "@/lib/supabase/supabase-server";

export async function logoutUser() {
  const supabase = await supabaseServer();

  await supabase.auth.signOut();
}
