import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/supabase-server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { created_by, distributor_id, start_date, end_date, notes } = body;

        if (!created_by || !distributor_id) {
            return NextResponse.json(
                { message: "created_by dan distributor_id wajib diisi" },
                { status: 400 }
            );
        }

        const supabase = await supabaseServer();

        const { data, error } = await supabase
            .from("distributor_assignments")
            .insert([
                {
                    created_by,
                    distributor_id,
                    start_date: start_date ? new Date(start_date).toISOString() : null,
                    end_date: end_date ? new Date(end_date).toISOString() : null,
                    notes,
                },
            ])
            .select("*")
            .single();

        if (error) {
            return NextResponse.json(
                { message: error.message },
                { status: 400 }
            );
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
