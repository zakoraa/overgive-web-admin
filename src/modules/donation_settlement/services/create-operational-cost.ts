"use server";

import { supabaseServer } from "@/core/lib/supabase/supabase-server";

interface OperationalCostInput {
    campaignId: string;
    amount: number;
    note?: string;
}

export const createOperationalCost = async (input: OperationalCostInput) => {
    const supabase = await supabaseServer();

    // Ambil user login
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) throw new Error("User belum login");

    // Ambil id user dari tabel users
    const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("auth_id", user.id)
        .single();

    if (userError || !userData) throw new Error("Data user tidak ditemukan");

    // Ambil total gross & total fee existing
    const { data: settlements, error: settlementsError } = await supabase
        .from("donation_settlements")
        .select("gross_amount, xendit_fee, gas_fee, total_fee, net_amount")
        .eq("campaign_id", input.campaignId);

    if (settlementsError || !settlements || settlements.length === 0)
        throw new Error("Donation settlements tidak ditemukan");

    const totalGross = settlements.reduce((acc, s) => acc + s.gross_amount, 0);
    const totalXendit = settlements.reduce((acc, s) => acc + s.xendit_fee, 0);
    const totalGas = settlements.reduce((acc, s) => acc + s.gas_fee, 0);

    // Ambil total operational cost existing
    const { data: opsCosts, error: opsError } = await supabase
        .from("campaign_operational_costs")
        .select("amount")
        .eq("campaign_id", input.campaignId);

    if (opsError) throw new Error(opsError.message);

    const totalOperationalExisting = opsCosts?.reduce((acc, cur) => acc + cur.amount, 0) || 0;

    // Hitung total fee setelah tambah yang baru
    const totalFeeAfter = totalXendit + totalGas + totalOperationalExisting + input.amount;

    // Validasi: jangan lebih dari 10% dari total gross
    if (totalFeeAfter > totalGross * 0.1) {
        throw new Error(
            `Jumlah biaya operasional terlalu tinggi. Maksimal total fee (xendit + gas + operasional) adalah 10% dari total donasi (Rp ${Math.floor(totalGross * 0.1)})`
        );
    }

    // Insert biaya operasional
    const { data, error } = await supabase
        .from("campaign_operational_costs")
        .insert({
            campaign_id: input.campaignId,
            amount: input.amount,
            note: input.note,
            created_by: userData.id,
        })
        .select("*")
        .single();

    if (error) throw new Error(error.message);

    // Update donation settlements updated_at
    const { error: settlementsUpdateError } = await supabase
        .from("donation_settlements")
        .update({ updated_at: new Date().toISOString() })
        .eq("campaign_id", input.campaignId);

    if (settlementsUpdateError) throw new Error(settlementsUpdateError.message);

    return data;
};

export const updateOperationalCost = async (
    id: string,
    updates: { amount?: number; note?: string }
) => {
    const supabase = await supabaseServer();

    const { data, error } = await supabase
        .from("campaign_operational_costs")
        .update(updates)
        .eq("id", id)
        .select("*")
        .single();

    if (error) throw new Error(error.message);

    // Bisa update donation settlements juga jika diperlukan
    if (updates.amount) {
        const { data: settlements, error: settlementsError } = await supabase
            .from("donation_settlements")
            .update({ updated_at: new Date().toISOString() })
            .eq("campaign_id", data.campaign_id);

        if (settlementsError) throw new Error(settlementsError.message);
    }

    return data;
};
