"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { User } from "@/core/types/user";

interface UpdateDistributorNameInput {
  id: string;
  name: string;
}

export async function updateDistributorName({ id, name }: UpdateDistributorNameInput): Promise<User> {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("users")
    .update({ name })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("User tidak ditemukan");

  return data as User;
}
