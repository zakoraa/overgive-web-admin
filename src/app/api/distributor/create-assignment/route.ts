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
            console.log("ERROR CREATE ASSIGNMENT: ", error)
            return NextResponse.json({ message: error.message }, { status: 400 });
        }

        return NextResponse.json({ message: "success", data });
    } catch (err) {
        console.error("Error creating assignment:", err);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
