import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function DELETE({ params }) {
    try {
        const client = await pool.connect();
        await client.query(`DELETE FROM tasks WHERE id=${params.id}`);

        client.release();
        
        return NextResponse.json({});
    }catch {
        return NextResponse.json({err: 1});
    }
}

