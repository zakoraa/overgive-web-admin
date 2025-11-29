// export const deleteDistributorAssignment = async (id: string) => {
//   const supabase = createClient();

//   const { error } = await supabase
//     .from("distributor_assignments")
//     .update({ deleted_at: new Date().toISOString() })
//     .eq("id", id);

//   if (error) return { success: false, error: error.message };
//   return { success: true };
// };
