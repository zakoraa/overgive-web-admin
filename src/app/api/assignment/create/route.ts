import { NextResponse } from "next/server";
import { supabaseServer } from "@/core/lib/supabase/supabase-server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { assigned_by, distributor_id, campaign_id, notes = null } = body;

        if (!assigned_by || !distributor_id || !campaign_id) {
            return NextResponse.json(
                { message: "assigned_by, distributor_id, dan campaign_id wajib diisi" },
                { status: 400 }
            );
        }

        const supabase = await supabaseServer();

        /** 
         * 1. CEK APAKAH SUDAH ADA ASSIGNMENT AKTIF
         */
        const { data: existingAssignment, error: checkError } = await supabase
            .from("distributor_assignments")
            .select("id")
            .eq("campaign_id", campaign_id)
            .eq("distributor_id", distributor_id)
            .is("deleted_at", null)
            .maybeSingle();

        if (checkError) {
            return NextResponse.json(
                { message: checkError.message },
                { status: 400 }
            );
        }

        if (existingAssignment) {
        console.log("ERROR : ", existingAssignment)

            return NextResponse.json(
                {
                    message: "Distributor sudah ditugaskan ke kampanye ini",
                },
                { status: 409 } // Conflict
            );
        }

        /**
         * 2. INSERT JIKA BELUM ADA
         */
        const { data, error } = await supabase
            .from("distributor_assignments")
            .insert([
                {
                    distributor_id,
                    campaign_id,
                    assigned_by,
                    assigned_at: new Date().toISOString(),
                    notes,
                },
            ])
            .select("*")
            .single();

        if (error) {
            return NextResponse.json({ message: error.message }, { status: 400 });
        }

        return NextResponse.json({ message: "success", data });
    } catch (err) {
        console.log("ERROR : ", err)
        return NextResponse.json(
            { message: "Terjadi kesalahan, penugasan tidak dapat ditambahkan." },
            { status: 500 }
        );
    }
}
