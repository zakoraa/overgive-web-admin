"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";
import { formatRupiah } from "@/core/utils/currency";

interface OperationalCostInput {
    campaignId: string;
    amount: number;
    maxAllowedAmount: number;
    receiptImageUrl: string;
    note: string;
}

export const createOperationalCost = async (input: OperationalCostInput) => {
    const supabase = await supabaseServer();

    // Ambil user login
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        throw new Error("User belum login");
    }

    // Ambil id user dari tabel users
    const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("auth_id", user.id)
        .single();

    if (userError || !userData) {
        throw new Error("Data user tidak ditemukan");
    }

    // Ambil total operational cost existing
    const { data: opsCosts, error: opsError } = await supabase
        .from("campaign_operational_costs")
        .select("amount")
        .eq("campaign_id", input.campaignId);

    if (opsError) {
        throw new Error(opsError.message);
    }

    const totalExistingAmount =
        opsCosts?.reduce((sum, item) => sum + Number(item.amount), 0) ?? 0;

    const totalAfterInsert = totalExistingAmount + input.amount;

    if (totalAfterInsert > input.maxAllowedAmount) {
        throw new Error(
            `Biaya operasional melebihi batas maksimum (${formatRupiah(input.maxAllowedAmount)})`
        );
    }

    const { data, error } = await supabase
        .from("campaign_operational_costs")
        .insert({
            campaign_id: input.campaignId,
            amount: input.amount,
            note: input.note,
            receipt_image_url: input.receiptImageUrl,
            created_by: userData.id,
        })
        .select("*")
        .single();

    if (error) {
        throw new Error(error.message);
    }

    return data;
};
