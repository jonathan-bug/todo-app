import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
    try {
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM prueba");
        
        return NextResponse.json(result.rows);
    }catch(error) {
        console.log(error)
        return NextResponse.json({x: 0});
    }
}
