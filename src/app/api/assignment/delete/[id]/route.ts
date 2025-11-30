import { NextResponse } from "next/server";
import { supabaseServer } from "@/core/lib/supabase/supabase-server";

export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    try {
        const supabase = await supabaseServer();

        const { data, error } = await supabase
            .from("distributor_assignments")
            .update({
                deleted_at: new Date().toISOString(),
            })
            .eq("id", id)
            .select("*")
            .single();

        if (error) {
            console.log("ERROR SOFT DELETE ASSIGNMENT:", error);
            return NextResponse.json({ message: error.message }, { status: 400 });
        }

        return NextResponse.json({ message: "success", data });
    } catch (err) {
        console.error("ERROR DELETE ASSIGNMENT:", err);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
