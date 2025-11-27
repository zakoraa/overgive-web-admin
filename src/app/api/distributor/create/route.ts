import { NextRequest, NextResponse } from "next/server";
import generatePassword from "generate-password";
import { supabaseAdmin } from "@/lib/supabase/supabase-admin";

export async function POST(req: NextRequest) {
    try {
        const { fullName, email } = await req.json();

        if (!fullName || !email) {
            return NextResponse.json({ message: "Nama lengkap dan email harus diisi" }, { status: 400 });
        }

        const supabase = await supabaseAdmin();

        const password = generatePassword.generate({
            length: 12,
            numbers: true,
            symbols: true,
            uppercase: true,
            strict: true,
        });

        const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
            email,
            password,
            user_metadata: { fullName, role: "distributor" },
        });

        if (authError || !authUser) {
            console.error("Failed to register Auth user:", authError);
            return NextResponse.json({ message: "Gagal mendaftar user di Auth" }, { status: 500 });
        }

        const { data: inserted, error: insertError } = await supabase
            .from("users")
            .insert([{ name: fullName, email, role: "distributor" }])
            .select("*")
            .single();

        if (insertError || !inserted) {
            console.error("Failed to insert user in DB:", insertError);
            return NextResponse.json({ message: "Gagal menyimpan user di DB" }, { status: 500 });
        }

        return NextResponse.json({ distributor: inserted, password }, { status: 201 });
    } catch (err) {
        console.error("API Error:", err);
        return NextResponse.json({ message: "Terjadi kesalahan pada server" }, { status: 500 });
    }
}
